import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from "../../../shared/components/Navbar";
import BillBreakdown from "../Components/BillBreakdown";
import OrderedItems from "../Components/OrderedItems";
import OrderTrackingCard from "../Components/OrderTrackingCard";
import useMyOrders from "../hooks/useMyOrders";
import useMakeArrived from "../hooks/useMakeArrived";
import usePageParam from "@/shared/hooks/usePageParam";
import Pagination from "@/shared/components/Pagination";
import { useEffect } from "react";

const LEFT_COL = "w-full min-w-0 lg:w-1/2 lg:shrink-0";

const ACTION_BUTTON =
  "rounded-xl bg-success px-6 py-3 text-lg font-semibold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";

export default function Orders() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { page, setPage } = usePageParam();
  const { data: ordersData, isLoading, isError, isFetching, error } = useMyOrders(page);
  const { mutate: makeArrived, isPending } = useMakeArrived();

  const orders = ordersData?.items ?? [];

  useEffect(() => {
    if (ordersData && ordersData.totalPages > 0 && page > ordersData.totalPages) setPage(ordersData.totalPages);
  }, [ordersData, page, setPage]);

  useEffect(() => {window.scrollTo({ top: 0, behavior: "smooth" })}, [page]);

  if (isLoading) {
    return (
      <p className="m-auto text-xl font-semibold">{t("common.loading")}</p>
    );
  }

  if (isError || !ordersData) {
    return (
      <div>
        <Navbar header={t("orders.header")} />
        <p className="text-2xl font-semibold text-center mt-20">
          {isError ? error.message : t("orders.noActiveSession")}
        </p>
      </div>
    );
  }

  return (
    <>
      <Navbar header={t("orders.header")} />

      <div className="p-6 flex flex-col gap-6">
        {orders.map((order) => {
          const totalPrice = order.items.reduce(
            (acc, item) => acc + (item.unitPrice * item.quantity || 0),
            0,
          );

          const showArrived = order.status === 2;
          const showInvoice = order.status === 3;

          return (
            <Accordion
          key={order.sessionId}
              type="single"
              collapsible
              className="w-full flex justify-center items-center"
            >
              <AccordionItem
                value={order.sessionId}
                className="border-none min-w-full"
              >
                <AccordionTrigger
                  headerClassName={LEFT_COL}
                  className="p-0 hover:no-underline"
                >
                  <div className="w-full *:w-full! *:max-w-none!">
                    <OrderTrackingCard myOrders={order} />
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pt-6">
                  {(showArrived || showInvoice) && (
                    <div
                      className={`${LEFT_COL} flex flex-col items-center gap-4 mb-5 rounded-2xl border border-[#232428] bg-[#101116] p-4 text-center`}
                    >
                      <p className="text-muted-foreground">
                        {showArrived
                          ? t("orders.arrivedPrompt")
                          : t("orders.invoicePrompt")}
                      </p>

                      {showArrived ? (
                        <button
                          type="button"
                          disabled={isPending}
                          className={ACTION_BUTTON}
                          onClick={() => makeArrived(order.sessionId)}
                        >
                          {t("session.actions.markArrived")}
                        </button>
                      ) : (
                        <button
                          type="button"
                          className={ACTION_BUTTON}
                          onClick={() =>
                            navigate(`/orders/${order.sessionId}/invoice`)
                          }
                        >
                          {t("orders.invoiceButton")}
                        </button>
                      )}
                    </div>
                  )}

                  <div className="flex flex-col lg:flex-row lg:items-stretch gap-6 w-full min-w-0">
                    <div
                      className={`${LEFT_COL} flex *:w-full! *:max-w-none! *:min-w-0!`}
                    >
                      <OrderedItems orderDetails={order.items} />
                    </div>

                    <div className="w-full min-w-0 flex lg:flex-1 *:w-full! *:max-w-full! *:min-w-0!">
                      <BillBreakdown totalPrice={totalPrice} order={order} />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })}
        {orders.length === 0 && (
          <p className="text-2xl font-semibold text-center">{t("orders.noActiveSession")}</p>
        )}
        {ordersData && (
          <>
            <p className="text-sm text-muted-foreground">
              Showing {ordersData.totalCount === 0 ? 0 : (page - 1) * ordersData.pageSize + 1}–{Math.min(page * ordersData.pageSize, ordersData.totalCount)} of {ordersData.totalCount}
            </p>
            <Pagination currentPage={page} totalPages={ordersData.totalPages} onPageChange={setPage} disabled={isFetching} />
          </>
        )}
      </div>
    </>
  );
}
