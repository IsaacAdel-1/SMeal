
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import RestaurantHeader from "../components/RestaurantHeader";
import MenuItemCard from "../components/MenuItemCard";
import MenuFooter from "../components/MenuFooter";
import useRestaurantsItems from "../hooks/useRestaurantsItems";
import useRestaurants from "../hooks/userRestaurant";
import useActiveSessions from "@/modules/home/hooks/useActiveSession";
import Navbar from "@/shared/components/Navbar";
import type { MenuItem } from "../types";
import type { ActiveSessionType } from "@/modules/home/types";
import useCreateSession from "../hooks/useCreateSession";
import useJoinSession from "../hooks/useJoinSession";
import useSessionAction from "../hooks/useSessionAction";
import type { SessionAction } from "../services/sessionAction.service";

const findRestaurantSession = (
  sessions: ActiveSessionType[] | undefined,
  restaurantId: string | undefined
) =>
  sessions?.find(
    (s) => s.restaurantId.toLowerCase() === restaurantId?.toLowerCase()
  );

export default function RestaurantMenuPage() {
  const { t } = useTranslation();

  const { restaurantId } = useParams<{ restaurantId: string }>();

  const { data: itemsRes } = useRestaurantsItems(restaurantId!);
  const { data: restaurantRes, isLoading } = useRestaurants(restaurantId!);
  const { data: sessionsRes, isLoading: sessionsLoading } =
    useActiveSessions();

  const { mutate: createSessionFn, isPending: isCreating } =
    useCreateSession();
  const { mutate: sessionActionFn, isPending: isActing } =
    useSessionAction();
  const { mutate: joinSession, isPending: joinSessionPending } =
    useJoinSession();

  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const items: MenuItem[] = itemsRes?.data?.items ?? [];

  const activeSession = findRestaurantSession(
    sessionsRes?.data,
    restaurantId
  );
  const sessionId = activeSession?.sessionId;

  const itemsCount = Object.values(quantities).reduce((a, b) => a + b, 0);

  const total = items.reduce(
    (sum, item) => sum + item.price * (quantities[item.id] ?? 0),
    0
  );

  const orderItems = Object.entries(quantities)
    .filter(([, quantity]) => quantity > 0)
    .map(([menuItemId, quantity]) => ({ menuItemId, quantity }));

  const footerDisabled = !activeSession
    ? isCreating || orderItems.length === 0
    : activeSession.currentUserIsOwner
      ? isActing
      : joinSessionPending || orderItems.length === 0;

  const onCreateSession = () => {
    if (!restaurantId || orderItems.length === 0) return;

    createSessionFn({ restaurantId, items: orderItems });
  };

  const onSessionAction = (action: SessionAction) => {
    if (!sessionId) return;

    if (
      (action === "cancel" || action === "end") &&
      !window.confirm(t("session.confirmAction"))
    ) {
      return;
    }

    sessionActionFn({ sessionId, action });
  };

  const onJoinSession = () => {
    if (!sessionId) return;

    joinSession({ sessionId, items: orderItems });
  };

  const onIncrease = (id: string) =>
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] ?? 0) + 1,
    }));

  const onDecrease = (id: string) =>
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] ?? 0) - 1, 0),
    }));

  if (isLoading) {
    return <p>{t("common.loading")}</p>;
  }

  if (!restaurantRes) {
    return <p>{t("common.restaurantNotFound")}</p>;
  }

  const restaurant = restaurantRes.data;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <Navbar header={t("session.menuHeader", { name: restaurant.name })} />

      <div className="min-h-0 flex-1 overflow-y-auto p-6">
        <RestaurantHeader
          name={restaurant.name}
          description={restaurant.description}
          logoUrl={restaurant.logoUrl}
        />

        <div className="grid grid-cols-1 gap-6 py-6 min-[1000px]:grid-cols-2">
          {items.map((i) => (
            <MenuItemCard
              key={i.id}
              name={i.name}
              description={i.description}
              price={i.price}
              imageUrl={i.imageUrl}
              quantity={quantities[i.id] ?? 0}
              onIncrease={() => onIncrease(i.id)}
              onDecrease={() => onDecrease(i.id)}
            />
          ))}
        </div>
      </div>

      <div className="shrink-0">
        <MenuFooter
          itemsCount={itemsCount}
          total={total}
          session={activeSession}
          sessionLoading={sessionsLoading}
          onCreateSession={onCreateSession}
          onJoinSession={onJoinSession}
          onSessionAction={onSessionAction}
          disabled={footerDisabled}
          busy={isActing}
        />
      </div>
    </div>
  );
}
