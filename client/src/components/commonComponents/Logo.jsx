import { Link } from "react-router-dom";
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react";
import { useRef } from "react";



export const Logo = ()=>{

  // Logo animation code..
  const logoRef = useRef(null);
  useGSAP(() => {
    gsap.from(logoRef.current,{
      opacity: 0,
      y: -20,
      duration: 1,
      ease: "power2.out",
    });
  }, []);



  return (
    <Link 
    ref={logoRef}
    to={"/"}>
      <div className="-mt-2 pl-2 sm:pl-0 inline-block font-extrabold hover:scale-102 ease duration-200 active:scale-97">
        <span className=" text-xl sm:text-2xl bg-linear-to-r from-blue-400 to-violet-400 text-transparent bg-clip-text">FWU Sathi</span>
        <span className="text-3xl text-orange-500">.</span>
      </div>
    </Link>
  );
}