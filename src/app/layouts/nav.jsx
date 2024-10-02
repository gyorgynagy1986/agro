import Image from "next/image"
import logo from '../../../public/assets/logo.svg'
import { meta } from '@/doc/meta'
import { Asap } from "next/font/google";

  const asap = Asap({ subsets: ["latin"] });


const Nav = () => {
  return (
    <section className="bg-custom-gradient pt-4 pb-4">
    <div className='pl-[5vw] pr-[5vw] justify-between flex items-end mx-auto'>
        <div className="" >
        <Image className="w-[152px] min-w-28 min-w" src={logo} alt={meta.name} />
        </div>
        <div className="hidden lg:block ">
            <ul className={`${"flex gap-3 text-white"} ${asap.className}`}>
            <li>Főoldal</li>
            <li>Terménykereskedelem</li>
            <li>Inputanyag</li>
            <li>Területi képviselők</li>
            <li>Rólunk</li>
            <li>Elérhetőség</li></ul>
        </div>
        <div  className="">
          <ul className="flex  items-center gap-3">
            <li>HU</li>
            <li>EN</li>
            <li>SRB</li>
          </ul>
        </div>
    </div>
      </section>
  )
}

export default Nav