import { useTranslation } from "react-i18next";
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
import UploadReceiptDialog from "../Components/UploadReceiptDialog";
import useMyOrders from "../hooks/useMyOrders";
import useMakeArrived from "../hooks/useMakeArrived";

const LEFT_COL = "w-full min-w-0 lg:w-1/2 lg:shrink-0";

const ACTION_BUTTON =
  "rounded-xl bg-success px-6 py-3 text-lg font-semibold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";

const ACTION_TEXT = {
  arrived:
    "Your order has arrived from the restaurant. Confirm to mark it as arrived.",
  invoice: "Upload the receipt and the delivery cost for this order.",
};

export default function Orders() {
  const { t } = useTranslation();

  const { data: ordersData, isLoading, isError } = useMyOrders();
  const { mutate: makeArrived, isPending } = useMakeArrived();

  const orders = ordersData?.data?.items ?? [];

  if (isLoading) {
    return <p className="m-auto text-xl font-semibold">...</p>;
  }

  if (isError || !ordersData) {
    return (
      <div>
        <Navbar header={t("orders.header")} />
        <p className="text-2xl font-semibold text-center mt-20">
          {t("orders.noActiveSession")}
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
              key={order.orderId}
              type="single"
              collapsible
              
              className="w-full"
            >
              <AccordionItem value={order.orderId} className="border-none min-w-0">
                <AccordionTrigger
                  headerClassName={LEFT_COL}
                  className="p-0 hover:no-underline"
                >
                  <div className="w-full [&>*]:w-full! [&>*]:max-w-none!">
                    <OrderTrackingCard myOrders={order} />
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pt-6">
                  {(showArrived || showInvoice) && (
                    <div
                      className={`${LEFT_COL} flex flex-col items-center gap-4 mb-5 rounded-2xl border border-[#232428] bg-[#101116] p-4 text-center`}
                    >
                      <p className="text-muted-foreground">
                        {showArrived ? ACTION_TEXT.arrived : ACTION_TEXT.invoice}
                      </p>

                      {showArrived ? (
                        <button
                          type="button"
                          disabled={isPending}
                          className={ACTION_BUTTON}
                          onClick={() => makeArrived(order.sessionId)}
                        >
                          Mark as arrived
                        </button>
                      ) : (
                        <UploadReceiptDialog sessionId={order.sessionId}>
                          <button type="button" className={ACTION_BUTTON}>
                            Invoice
                          </button>
                        </UploadReceiptDialog>
                      )}
                    </div>
                  )}

                  <div className="flex flex-col lg:flex-row lg:items-stretch gap-6 w-full min-w-0">
                    <div
                      className={`${LEFT_COL} flex [&>*]:w-full! [&>*]:max-w-none! [&>*]:min-w-0!`}
                    >
                      <OrderedItems orderDetails={order.items} />
                    </div>

                    <div className="w-full min-w-0 flex lg:flex-1 [&>*]:w-full! [&>*]:max-w-full! [&>*]:min-w-0!">
                      <BillBreakdown totalPrice={totalPrice} />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })}
      </div>
    </>
  );
}