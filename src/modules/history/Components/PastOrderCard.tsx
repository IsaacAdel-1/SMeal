import type { Invoice } from "../types";


export default function PastOrderCard({order} :{order : Invoice}) {
  return (
    <div>
        <header>
            <div>
                <p>{order.restaurant}</p>
                <p>{order.createdAt} {}</p>
            </div>
        </header>
    </div>
  )
}
