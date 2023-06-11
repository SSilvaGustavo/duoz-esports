import { Link } from "react-router-dom";
import valorantChar1 from "./assets/valorant-char1.gif";
import valorantChar2 from "./assets/valorant-char2.gif";
import { ArrowRight } from "phosphor-react";
import { Fragment, useContext } from "react";
import { AppContext } from "./components/Context/AppContext";

export function NotFound() {
  const { isMobile, isDesktop } = useContext(AppContext);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20 overflow-hidden">
      <div className="flex text-zinc-200 items-center justify-center">
        <Link to={"https://twitter.com/QuelmNossfe"} target="_blank">
          <img src={valorantChar1} alt="" className={`${isDesktop ? "cursor-pointer pl-10" : "hidden"}`} />
        </Link>
        <div className="flex flex-col">
          <div className="flex flex-col items-center mb-6 lg:mb-[12rem]">
            <h1 className="text-[120px] font-bold md:text-[240px]">4<span className="bg-text-error-gradient bg-clip-text text-transparent">0</span>4</h1>
            <h2 className="w-max text-4xl font-bold tracking-wider md:text-5xl">PAGE <span className="bg-text-error-gradient bg-clip-text text-transparent">NOT </span> FOUND</h2>
          </div>
          {
            !isDesktop ? 
            <div className="flex">
            <Link to={"https://twitter.com/QuelmNossfe"} target="_blank">
              <img src={valorantChar1} alt="" className="" />
            </Link>
            <Link to={"https://twitter.com/QuelmNossfe"} target="_blank">
              <img src={valorantChar2} alt="" className="" />
            </Link>
          </div>
          :
          <Fragment></Fragment>
          }
          <div className="flex flex-col items-center gap-3 tracking-tight">
            <p className="text-3xl font-semibold">SEGUE A <span className="bg-text-error-gradient bg-clip-text text-transparent">CALL!</span></p>
            <p className="text-center mb-6 lg:w-max lg:mb-0 lg:text-lg">Parece que seu duo esta camperando em algum lugar, mas não é aqui.</p>
            
          <Link to={"/"} className="flex items-center gap-3 py-3 px-4 text-white rounded bg-space-700 hover:bg-space-800 transition-all group
          hover:text-space-200">
            Voltar para página inicial
            <ArrowRight size={26} className="transition duration-100 ease-linear group-hover:translate-x-1"/>
          </Link>
          </div>
        </div>
        <Link to={"https://twitter.com/QuelmNossfe"} target="_blank">
          <img src={valorantChar2} alt="" className={`${isDesktop ? "cursor-pointer pr-10" : "hidden"}`} />
        </Link>
      </div>
    </div>
  )
} 
