import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { OrderTable } from "../Components/InvoiceEditor";
import useSession from "../hooks/useSession";
import { mapSessionToParticipants } from "../utils/mapSessionToParticipants";
import UploadReceiptDialog from "../Components/UploadReceiptDialog";

export default function OrderInvoice() {
  const { sessionId } = useParams<{ sessionId: string }>();

  const { data, isLoading, isError } = useSession(sessionId);

  const participants = useMemo(
    () => (data ? mapSessionToParticipants(data) : []),
    [data]
  );

  if (!sessionId) return <p>Invalid session</p>;
  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Something went wrong</p>;

  const deliveryCost = participants.reduce((sum, p) => sum + p.deliveryShare, 0);

  return (
    <div className="p-6 shrink-0">
      <div className="rounded-xl border border-[#232428] bg-[#101116] p-4 text-white flex justify-between gap-20">
        <OrderTable
          sessionId={sessionId}
          deliveryCost={deliveryCost}
          participants={participants}
          isApproved={false}
          
        />
        <UploadReceiptDialog sessionId={sessionId} >
          <button>
            Send Reset
          </button>
        </UploadReceiptDialog>
      </div>
    </div>
  );
}