

export default function TotalPastSpent() {
    const TotalPastSpent = 445 ;
    const completedOrders = 4 ;
  return (
    <div className="bg-linear-135 from-[#34c759]/10 to-white/2 border border-[#174326] py-5 px-6 flex justify-between text-white rounded-2xl font-bold">
        <div className="flex flex-col gap-2">
            <p className="text-[#8e8e93]">Total Past Spent</p>
            <p className="text-2xl text-[#34c759]">{TotalPastSpent.toFixed(2)} EGP</p>
        </div>

        <div className="flex flex-col gap-2">
            <p className="text-[#8e8e93] text-sm">Completed Orders</p>
            <p className="text-2xl">{completedOrders} Sessions</p>
        </div>
    </div>
  )
}
