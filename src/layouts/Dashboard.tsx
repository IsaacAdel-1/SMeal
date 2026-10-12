import HomePage from '../modules/home/pages/HomePage'
import Sidebar from '../shared/components/sidebar'
export default function Dashboard() {
  return (
    <div className='flex'>
        <div>
            <Sidebar/>
        </div>
        <div className=' w-full'>
            <HomePage/>
        </div>
    </div>
  )
}
