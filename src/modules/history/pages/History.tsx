import { useTranslation } from "react-i18next";
import Navbar from "../../../shared/components/Navbar";
import MapingOrders from "../Components/MapingOrders";
import TotalPastSpent from "../Components/TotalPastSpent";
import { useHistory } from "@/modules/orders/hooks/useOrderQueries";
import { getOrderTotals } from "@/modules/orders/utils/orderTotals";
import usePageParam from "@/shared/hooks/usePageParam";
import Pagination from "@/shared/components/Pagination";
import { PAGE_SIZE } from "@/shared/types/pagination";

export default function History() {
  const { t } = useTranslation();
  const { data: orders = [], isLoading, isError, error, refetch, isFetching } = useHistory();
  const { page, setPage } = usePageParam();

  // The whole history is loaded so the totals are right; the list is paged locally.
  const totalPages = Math.max(1, Math.ceil(orders.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageOrders = orders.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const totalSpent = orders.reduce((sum, order) => sum + getOrderTotals(order).total, 0);

  return (
    <div>
      <Navbar header={t("history.header")} />
      <div className="px-4 py-6 sm:px-7">
        {isLoading ? (
          <p className="text-muted-foreground">{t("history.loading")}</p>
        ) : isError ? (
          <div className="flex flex-col items-start gap-3">
            <p className="text-destructive">{error.message}</p>
            <button
              type="button"
              disabled={isFetching}
              onClick={() => refetch()}
              className="rounded-xl border border-border bg-surface-control px-4 py-2 font-semibold hover:bg-surface-raised disabled:opacity-50"
            >
              {t("history.retry")}
            </button>
          </div>
        ) : (
          <>
            <TotalPastSpent totalSpent={totalSpent} count={orders.length} />
            {orders.length === 0 ? (
              <p className="mt-6 text-2xl">{t("history.empty")}</p>
            ) : (
              <>
                <MapingOrders orders={pageOrders} />
                <div className="mt-6">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalCount={orders.length}
                    pageSize={PAGE_SIZE}
                    onPageChange={setPage}
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
