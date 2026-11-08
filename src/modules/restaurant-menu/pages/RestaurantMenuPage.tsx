import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, LogOut, PlusCircle, Save, UserPlus } from "lucide-react";

import RestaurantHeader from "../components/RestaurantHeader";
import MenuItemCard from "../components/MenuItemCard";
import MenuFooter, { type FooterButton } from "../components/MenuFooter";
import SessionBanner from "../components/SessionBanner";
import { useRestaurant, useRestaurantItems } from "../hooks/useMenuQueries";
import {
  useCreateSession,
  useJoinSession,
  useLeaveSession,
  useOwnerStep,
  useUpdateOrder,
} from "../hooks/useSessionMutations";
import type { MenuItem, OrderItem, Quantities } from "../types";
import { useActiveSessions } from "@/modules/home/hooks/useHomeQueries";
import type { ActiveSessionType } from "@/modules/home/types";
import Navbar from "@/shared/components/Navbar";
import { ACTION_STYLES, canCancelSession, getOwnerStep } from "@/shared/session/ownerActions";
import { SessionStatus } from "@/shared/session/sessionStatus";
import { sameId } from "@/lib/utils";

/** Prefer the session the user takes part in, in case the restaurant has more than one. */
const findRestaurantSession = (sessions: ActiveSessionType[] | undefined, restaurantId: string) => {
  const matches = (sessions ?? []).filter((s) => sameId(s.restaurantId, restaurantId));
  return (
    matches.find((s) => s.currentUserIsOwner || s.currentUserOrderId) ??
    matches.find((s) => s.status === SessionStatus.Open) ??
    matches[0]
  );
};

const toQuantities = (items: OrderItem[] | null | undefined): Quantities =>
  Object.fromEntries((items ?? []).map((i) => [i.menuItemId.toLowerCase(), i.quantity]));

const toOrderItems = (quantities: Quantities, menu: MenuItem[]): OrderItem[] =>
  Object.entries(quantities)
    .filter(([, quantity]) => quantity > 0)
    .map(([id, quantity]) => ({
      menuItemId: menu.find((m) => sameId(m.id, id))?.id ?? id,
      quantity,
    }));

const sameQuantities = (a: Quantities, b: Quantities) =>
  [...new Set([...Object.keys(a), ...Object.keys(b)])].every((k) => (a[k] ?? 0) === (b[k] ?? 0));

export default function RestaurantMenuPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  if (!restaurantId) return <Navigate to="/home" replace />;
  // Remount per restaurant so the selected quantities never leak between menus.
  return <RestaurantMenu key={restaurantId} restaurantId={restaurantId} />;
}

function RestaurantMenu({ restaurantId }: { restaurantId: string }) {
  const { t } = useTranslation();

  const { data: restaurant, isLoading, isError, error } = useRestaurant(restaurantId);
  const { data: menu = [], isLoading: menuLoading } = useRestaurantItems(restaurantId);
  const { data: sessions, isLoading: sessionsLoading } = useActiveSessions();

  const createSession = useCreateSession();
  const joinSession = useJoinSession();
  const updateOrder = useUpdateOrder();
  const leaveSession = useLeaveSession();
  const ownerStep = useOwnerStep();
  const busy =
    createSession.isPending ||
    joinSession.isPending ||
    updateOrder.isPending ||
    leaveSession.isPending ||
    ownerStep.isPending;

  const session = findRestaurantSession(sessions, restaurantId);
  const isOwner = !!session?.currentUserIsOwner;
  const isOpen = session?.status === SessionStatus.Open;
  const orderId =
    session?.currentUserOrderId ??
    (session && sameId(restaurant?.sessionId, session.sessionId) ? restaurant?.orderId : null) ??
    null;

  // What the server has for the user's order; edits live in `draft` until they are saved.
  const savedItems = orderId ? restaurant?.orderItems : null;
  const saved = useMemo(() => toQuantities(savedItems), [savedItems]);
  const [draft, setDraft] = useState<Quantities | null>(null);
  const quantities = draft ?? saved;
  const resetDraft = () => setDraft(null);

  const editable = !session || isOpen;
  const hasChanges = !sameQuantities(quantities, saved);
  const orderItems = toOrderItems(quantities, menu);
  const hasItems = orderItems.length > 0;

  const itemsCount = orderItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = menu.reduce((sum, item) => sum + item.price * (quantities[item.id.toLowerCase()] ?? 0), 0);

  const changeQuantity = (id: string, delta: number) => {
    const key = id.toLowerCase();
    setDraft((prev) => {
      const base = prev ?? saved;
      return { ...base, [key]: Math.max((base[key] ?? 0) + delta, 0) };
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col">
        <Navbar header={t("common.loading")} />
        <p className="p-6 text-muted-foreground">{t("common.loading")}</p>
      </div>
    );
  }

  if (isError || !restaurant) {
    return (
      <div className="flex flex-1 flex-col">
        <Navbar header={t("common.restaurantNotFound")} />
        <div className="p-6">
          <p className="text-lg font-semibold">{isError ? error.message : t("common.restaurantNotFound")}</p>
          <Link to="/home" className="mt-4 inline-flex items-center gap-2 font-semibold text-brand hover:underline">
            <ArrowLeft className="size-4 rtl:rotate-180" /> {t("common.backHome")}
          </Link>
        </div>
      </div>
    );
  }

  const buttons: FooterButton[] = [];
  let hint: string | null = null;

  if (!session) {
    buttons.push({
      key: "create",
      label: t("session.actions.create"),
      icon: PlusCircle,
      style: ACTION_STYLES.red,
      primary: true,
      disabled: busy || !hasItems,
      onClick: () =>
        createSession.mutate({ restaurantId, items: orderItems }, { onSuccess: resetDraft }),
    });
    if (!hasItems) hint = t("footer.hints.pickToCreate");
  } else if (isOwner) {
    const step = getOwnerStep(session.status);
    if (session.status === SessionStatus.Closed) {
      buttons.push({
        key: "reopen",
        label: t("session.actions.reopen"),
        disabled: busy,
        onClick: () => ownerStep.run(session.sessionId, "open"),
      });
    }
    if (canCancelSession(session.status)) {
      buttons.push({
        key: "cancel",
        label: t("session.actions.cancel"),
        disabled: busy,
        onClick: () => ownerStep.run(session.sessionId, "cancel"),
      });
    }
    if (isOpen && orderId && hasChanges) {
      buttons.push({
        key: "update",
        label: t("session.actions.update"),
        disabled: busy || !hasItems,
        onClick: () => updateOrder.mutate({ orderId, items: orderItems }, { onSuccess: resetDraft }),
      });
      hint = hasItems ? t("footer.hints.unsaved") : t("footer.hints.ownerNeedsItems");
    }
    if (step) {
      buttons.push({
        key: step.action,
        label: t(step.labelKey),
        icon: step.icon,
        style: step.style,
        primary: true,
        disabled: busy,
        onClick: () => ownerStep.run(session.sessionId, step.action),
      });
    }
    if (!isOpen && !hint) hint = t("footer.hints.locked");
  } else if (!isOpen) {
    hint = orderId ? t("footer.hints.locked") : t("footer.hints.notAccepting");
  } else if (!orderId) {
    buttons.push({
      key: "join",
      label: t("session.actions.join"),
      icon: UserPlus,
      style: ACTION_STYLES.blue,
      primary: true,
      disabled: busy || !hasItems,
      onClick: () =>
        joinSession.mutate({ sessionId: session.sessionId, items: orderItems }, { onSuccess: resetDraft }),
    });
    hint = hasItems ? t("footer.hints.readyToJoin") : t("footer.hints.pickToJoin");
  } else {
    buttons.push({
      key: "leave",
      label: t("session.actions.leave"),
      icon: LogOut,
      disabled: busy,
      onClick: () => {
        if (window.confirm(t("session.confirm.leave"))) leaveSession.mutate(orderId, { onSuccess: resetDraft });
      },
    });
    buttons.push({
      key: "update",
      label: t("session.actions.update"),
      icon: Save,
      style: ACTION_STYLES.green,
      primary: true,
      disabled: busy || !hasChanges || !hasItems,
      onClick: () => updateOrder.mutate({ orderId, items: orderItems }, { onSuccess: resetDraft }),
    });
    hint = !hasItems
      ? t("footer.hints.emptyOrder")
      : hasChanges
        ? t("footer.hints.unsaved")
        : t("footer.hints.joined");
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <Navbar header={t("session.menuHeader", { name: restaurant.name })} />

      <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
        <RestaurantHeader
          name={restaurant.name}
          description={restaurant.description}
          logoUrl={restaurant.logoUrl}
          address={restaurant.address}
          phoneNumber={restaurant.phoneNumber}
        />

        {session && <SessionBanner session={session} hasOrder={!!orderId} />}

        {menuLoading ? (
          <p className="py-6 text-muted-foreground">{t("menu.loading")}</p>
        ) : menu.length === 0 ? (
          <p className="py-6 text-lg font-semibold">{t("menu.empty")}</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 py-6 min-[1000px]:grid-cols-2">
            {menu.map((item) => (
              <MenuItemCard
                key={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                imageUrl={item.imageUrl}
                quantity={quantities[item.id.toLowerCase()] ?? 0}
                disabled={!editable || busy}
                onIncrease={() => changeQuantity(item.id, 1)}
                onDecrease={() => changeQuantity(item.id, -1)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="shrink-0">
        <MenuFooter
          itemsCount={itemsCount}
          total={total}
          hint={hint}
          buttons={buttons}
          loading={sessionsLoading}
        />
      </div>
    </div>
  );
}
