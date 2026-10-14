import { Calendar, CheckCircle2, Receipt } from "lucide-react";
import type { Invoice } from "../types";

export const invoices: Invoice[] = [
  {
    id: "inv-001",
    restaurant: "Zo0z Crepe & Waffle",
    createdAt: "2026-10-13T15:15:00",
    hostName: "You",
    isHost: true,
    status: "paid",
    items: [
      { id: "i-1", name: "Mega Crispy Chicken Crepe", quantity: 1, price: 85 },
      { id: "i-2", name: "Extra Cheddar Dip", quantity: 1, price: 15 },
    ],
    deliveryTotal: 25,
    participants: 2,
  },
  {
    id: "inv-002",
    restaurant: "El Shabrawy Restaurant",
    createdAt: "2026-08-24T14:00:00",
    hostName: "Mohamed Ali",
    isHost: false,
    status: "paid",
    items: [
      { id: "i-3", name: "Super Foul Sandwich", quantity: 1, price: 25 },
      { id: "i-4", name: "Falafel Extra Mix", quantity: 1, price: 20 },
    ],
    deliveryTotal: 40,
    participants: 3,
  },
  {
    id: "inv-003",
    restaurant: "Pronto Pizza",
    createdAt: "2026-08-19T20:30:00",
    hostName: "You",
    isHost: true,
    status: "paid",
    items: [
      { id: "i-5", name: "Large Pepperoni Pizza", quantity: 1, price: 180 },
    ],
    deliveryTotal: 20,
    participants: 1,
  },
];

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: "EGP",
  }).format(amount);
}
export default function MapingOrders() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
      {invoices.map((i) => (
        <div
          key={i.id}
          className="w-full rounded-3xl border border-white/10 bg-[#0f1013] p-6 flex flex-col gap-5"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-white">{i.restaurant}</h3>
              <p className="flex items-center gap-1 text-sm text-gray-400">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(i.createdAt)} • Host: {i.isHost ? "You" : i.hostName}
              </p>
            </div>

            <span className="flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-semibold whitespace-nowrap">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {/* {badge.label} */}
            </span>
          </div>

          {/* Items */}
          <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4 flex flex-col gap-2">
            {i.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-indigo-200/80">
                  {item.quantity}× {item.name}
                </span>
                <span className="font-semibold text-white">
                  {formatMoney(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <span className="text-sm text-gray-400">
              Incl. {formatMoney(i.deliveryTotal)} Delivery
            </span>
            <span className="text-lg font-bold text-green-400">
              {formatMoney(i.total)}
            </span>
          </div>

          {/* Button */}
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
          >
            <Receipt className="w-4 h-4" />
            View Verified Receipt Scan
          </button>
        </div>
      ))}
    </div>
  );
}