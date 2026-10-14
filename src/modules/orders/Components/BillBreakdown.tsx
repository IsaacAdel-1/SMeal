
import CalculatorIcon from '../../../assets/svgs/CalculatorIcon'

export default function BillBreakdown() {
    const resutrantName = "ElShabrawy";
    const totalPrice = 45 ;
    const totalDilevery = 40 ;
    const people = 3 ;
    const DileveryForOne = totalDilevery / people ;
    const totalAmount = totalPrice + DileveryForOne ;
  return (
    <div className='bg-[#101116] rounded-2xl text-white p-4 min-w-85 lg:w-120  '>
        <header className='flex justify-between items-center mb-4  text-white'>
            <p className='flex'><CalculatorIcon className='text-[#ff3b30] '/>Bill Breakdown </p>
            <p className='text-[#8e8e93]'>{resutrantName}</p>
        </header>

        <div className='flex justify-between items-center my-3'>
            <p className='text-[#8e8e93]' >Your Items Subtotal</p>
            <p>{totalPrice.toFixed(2)}</p>
        </div>
        <div className='flex justify-between items-center my-3'>
            <p className='text-[#8e8e93]'>Delivery Share ({people} people)</p>
            <p>{DileveryForOne.toFixed(2)}</p>
        </div>

        <div className='line h-px border border-[#232428]'/>

        <div className='flex justify-between items-center my-3 font-bold'>
            <p>Total Amount</p>
            <p className='text-[#34c759]'>{totalAmount.toFixed(2)}</p>
        </div>
    </div>
  )
}
