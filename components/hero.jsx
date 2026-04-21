// // "use client"
// // import { useEffect, useRef } from 'react'
// // import { Button } from './ui/button'
// // import Link from 'next/link'
// // import Image from 'next/image'

// // const HeroSection = () => {
// // const imageRef = useRef(null);

// // useEffect(()=>{

// //     const imageElement= imageRef.current;

// //     const handleScroll = ()=>{

// //         const scrollPosition= window.scrollY;
// //         const scrollThreshold=100;
        
        
// //         if(scrollPosition > scrollThreshold ){
// //             imageElement.classList.add("scrolled")
// //         }else{
// //         imageElement.classList.remove("scrolled");
// //     }
// //    }
// //    window.addEventListener("scroll",handleScroll)
// //    return ()=> window.removeEventListener("scroll", handleScroll)
// // },[])




// //   return (
// //     <section className='w-full pt-36 md:pt-48 pb-10'>
// //         <div className='space-y-6 text-center'>
// //             <div className='space-y-6 mx-auto'>
// //                 <h1 className='text-4xl font-bold md:text-5xl lg:text-6xl xl:text-7xl gradient-title'>
// //                     Empowering your professional
// //                     <br/> growth with 
// //                     <br />
                    
// //                     AI-driven guidance
// //                 </h1>
// //                 <p className='mx-auto max-w-150 text-muted-foreground md:text-xl'>
// //                     Accelerate your career through tailored guidance, interview readiness, and powerful AI solutions.
// //                 </p>
// //             </div>
// //             <div className="flex justify-center space-x-4">
// //                 <Link href='/dashboard'>
// //                 <Button size='lg' className="px-8 bg-blue-200">Let’s go
// //                     </Button>
// //                     </Link>
                    
                  
// //             </div>
// //             <div  className='hero-image-wrapper mt-5 md:mt-0'>
// //                 <div ref={imageRef} className='hero-image'>
// //                     <Image src={"/banner1.png"} width={1100}
// //                     height={620}
// //                     alt="Banner Mentora"
// //                     className="rounded-lg shadow-2xl border mx-auto"
// //                     priority/>
// //                 </div>
// //             </div>

// //         </div>
// //     </section>
// //   )
// // }

// // export default HeroSection
// "use client"
// import { Button } from "./ui/button"
// import Link from "next/link"
// import dynamic from "next/dynamic"

// const Hero3D = dynamic(() => import("./Hero3D"), {
//   ssr: false,
// })

// const HeroSection = () => {
//   return (
//     <section className="w-full pt-36 md:pt-48 pb-10">
//       <div className="space-y-6 text-center">

//         {/* TEXT */}
//         <div className="space-y-6 mx-auto">
//           <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl xl:text-7xl gradient-title">
//             Empowering your professional
//             <br /> growth with
//             <br />
//             AI-driven guidance
//           </h1>

//           <p className="mx-auto max-w-150 text-muted-foreground md:text-xl">
//             Accelerate your career through tailored guidance, interview readiness, and powerful AI solutions.
//           </p>
//         </div>

//         {/* BUTTON */}
//         <div className="flex justify-center space-x-4">
//           <Link href="/dashboard">
//             <Button size="lg" className="px-8 bg-blue-200">
//               Let’s go
//             </Button>
//           </Link>
//         </div>

//         {/* 🤖 3D ROBOT */}
//         {/* <div className="mt-10">
//           <Hero3D />
//         </div> */}
//         <div className="mt-12 px-4 md:px-0 bg-gradient-to-b from-black via-[#0a0f1f] to-black rounded-xl">
//   <Hero3D />
// </div>

//       </div>
//     </section>
//   )
// }

// export default HeroSection
"use client"

import { Button } from "./ui/button"
import Link from "next/link"
import dynamic from "next/dynamic"

const Hero3D = dynamic(() => import("./Hero3D"), {
  ssr: false,
})

const HeroSection = () => {
  return (
    <section className="w-full pt-36 md:pt-48 pb-10">
      <div className="space-y-6 text-center">

        {/* TEXT */}
        <div className="space-y-6 mx-auto">
          <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl xl:text-7xl gradient-title">
            Empowering your professional
            <br /> growth with
            <br />
            AI-driven guidance
          </h1>

          <p className="mx-auto max-w-150 text-muted-foreground md:text-xl">
            Accelerate your career through tailored guidance, interview readiness, and powerful AI solutions.
          </p>
        </div>

        {/* BUTTON */}
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button size="lg" className="px-8 bg-blue-200">
              Let’s go
            </Button>
          </Link>
        </div>

        {/* 🔥 3D SECTION WITH GRADIENT */}
        {/* <div className="mt-12 px-4 md:px-0 bg-gradient-to-b from-black via-[#0a0f1f] to-black rounded-xl"> */}
        <div className="mt-20 px-4 md:px-0 bg-gradient-to-b from-black via-[#0a0f1f] to-black rounded-xl">
          <Hero3D />
        </div>

      </div>
    </section>
  )
}

export default HeroSection