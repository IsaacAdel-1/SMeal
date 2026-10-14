import logo from '../../assets/images/sm_logo.png'

export default function Navbar({header} : {header : string} ) {
  return (
    <nav className='flex items-center p-5 gap-4 bg-[#0c0d12] border border-[#18191e]'>
        <img src={logo} alt="sM" className='h-11 w-11'/>
        <h2 className='text-white font-bold text-xl'>{header}</h2>
    </nav>
  )
}
