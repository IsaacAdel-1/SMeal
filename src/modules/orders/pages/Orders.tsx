import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "../../../shared/components/Navbar";
import BillBreakdown from "../Components/BillBreakdown";
import OrderedItems from "../Components/OrderedItems";
import OrderTrackingCard from "../Components/OrderTrackingCard";
import { useMyOrders } from "../hooks/useOrderQueries";
import type { OrderSession } from "../types";
import usePageParam from "@/shared/hooks/usePageParam";
import Pagination from "@/shared/components/Pagination";
import { useAuth } from "@/modules/auth/context/AuthContext";
import { useOwnerStep } from "@/modules/restaurant-menu/hooks/useSessionMutations";
import { getOwnerStep } from "@/shared/session/ownerActions";
import { SessionStatus } from "@/shared/session/sessionStatus";
import { sameId } from "@/lib/utils";

const LEFT_COL = "w-full min-w-0 lg:w-1/2 lg:shrink-0";

const ACTION_BUTTON =
  "flex items-center justify-center gap-2 rounded-xl bg-linear-to-r px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 rtl:bg-linear-to-l";

const PROMPTS: Record<number, string> = {
  [SessionStatus.Open]: "orders.prompts.open",
  [SessionStatus.Closed]: "orders.prompts.closed",
  [SessionStatus.Ordered]: "orders.prompts.ordered",
  [SessionStatus.Arrived]: "orders.prompts.arrived",
  [SessionStatus.InvoiceReady]: "orders.prompts.invoiceReady",
};

function OrderActions({ order, isOwner }: { order: OrderSession; isOwner: boolean }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { run, isPending } = useOwnerStep();
  const isOpen = order.status === SessionStatus.Open;
  const step = isOwner ? getOwnerStep(order.status) : null;

  if (!step && !isOpen) return null;
  const StepIcon = step?.icon;

  return (
    <div className={`${LEFT_COL} mb-5 flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-4 text-center`}>
      <p className="text-muted-foreground">
        {isOwner && PROMPTS[order.status] ? t(PROMPTS[order.status]) : t("orders.prompts.participantOpen")}
      </p>

      <div className="flex flex-wrap justify-center gap-2">
        {isOpen && (
          <button
            type="button"
            onClick={() => navigate(`/restaurants/${order.restaurantId}`)}
            className="flex items-center gap-2 rounded-xl border border-border bg-surface-control px-5 py-3 font-semibold text-foreground hover:bg-surface-raised"
          >
            <Pencil className="size-4" />
            {t("session.actions.editOrder")}
          </button>
        )}
        {step && StepIcon && (
          <button
            type="button"
            disabled={isPending}
            className={`${ACTION_BUTTON} ${step.style}`}
            onClick={() => run(order.sessionId, step.action)}
          >
            <StepIcon className="size-4" />
            {t(step.labelKey)}
          </button>
        )}
      </div>
    </div>
  );
}

export default function Orders() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { page, setPage } = usePageParam();
  const { data: ordersData, isLoading, isError, isFetching, error } = useMyOrders(page);

  const orders = ordersData?.items ?? [];

  useEffect(() => {
    if (ordersData && ordersData.totalPages > 0 && page > ordersData.totalPages) {
      setPage(ordersData.totalPages, { scroll: false });
    }
  }, [ordersData, page, setPage]);

  return (
    <>
      <Navbar header={t("orders.header")} />

      <div className="flex flex-col gap-6 p-4 sm:p-6">
        {isLoading ? (
          <p className="text-xl font-semibold text-muted-foreground">{t("common.loading")}</p>
        ) : isError ? (
          <p className="mt-10 text-center text-xl font-semibold text-destructive">{error.message}</p>
        ) : orders.length === 0 ? (
          <p className="mt-10 text-center text-2xl font-semibold">{t("orders.noActiveSession")}</p>
        ) : (
          orders.map((order) => {
            const isOwner = sameId(order.ownerId, user?.userId);
            return (
              <Accordion key={order.sessionId} type="single" collapsible className="w-full">
                <AccordionItem value={order.sessionId} className="border-none">
                  <AccordionTrigger headerClassName={LEFT_COL} className="p-0 hover:no-underline">
                    <OrderTrackingCard myOrders={order} />
                  </AccordionTrigger>

                  <AccordionContent className="pt-6">
                    <OrderActions order={order} isOwner={isOwner} />

                    <div className="flex w-full min-w-0 flex-col gap-6 lg:flex-row lg:items-stretch">
                      <div className={`${LEFT_COL} flex`}>
                        <OrderedItems orderDetails={order.items ?? []} editable={order.status === SessionStatus.Open} />
                      </div>
                      <div className="flex w-full min-w-0 lg:flex-1">
                        <BillBreakdown order={order} />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })
        )}

        {ordersData && (
          <Pagination
            currentPage={page}
            totalPages={ordersData.totalPages}
            totalCount={ordersData.totalCount}
            pageSize={ordersData.pageSize}
            onPageChange={setPage}
            disabled={isFetching}
          />
        )}
      </div>
    </>
  );
}
