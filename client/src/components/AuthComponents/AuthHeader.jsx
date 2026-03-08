import {use, useRef} from "react";
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react";


export const AuthHeader = ()=>{

  // LOGO animation code here...
  const logoRef = useRef(null);
  useGSAP(()=>{
    gsap.from(logoRef.current, {
      opacity: 0,
      y: -20,
      duration: 1,
      ease: "power3.out",
    });
  },[])


  return (
    <nav className="z-50 h-15 bg-white shadow flex justify-center items-center px-3 sm:px-20 fixed top-0 right-0 left-0">
      <div 
      ref={logoRef}
      className="w-50 flex items-center justify-center font-extrabold logo">
        <span className=" text-xl sm:text-3xl bg-linear-to-r from-blue-400 to-violet-400 text-transparent bg-clip-text">FWU Sathi</span>
        <span className="text-3xl text-orange-500">.</span>
      </div>
    </nav>
  );
}
