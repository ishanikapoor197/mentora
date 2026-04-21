
// "use client"

// import { Canvas, useFrame } from "@react-three/fiber"
// import { useGLTF, OrbitControls, Center, Float } from "@react-three/drei"
// import { Suspense, useRef } from "react"

// // 🤖 Robot Component (with rotation + blinking)
// function RobotModel() {
//   const { scene } = useGLTF("/models/robot.glb")
//   const ref = useRef()

//   const blinkTimer = useRef(0)
//   const isBlinking = useRef(false)

//   useFrame((state, delta) => {
//     if (!ref.current) return

//     // 🔄 smooth rotation
//     ref.current.rotation.y += 0.003

//     // ⏱️ blinking logic
//     blinkTimer.current += delta

//     if (blinkTimer.current > 3 && !isBlinking.current) {
//       isBlinking.current = true
//       blinkTimer.current = 0

//       // 👀 blink (quick squash)
//       ref.current.scale.y = 0.7

//       setTimeout(() => {
//         if (ref.current) {
//           ref.current.scale.y = 0.9
//         }
//         isBlinking.current = false
//       }, 120)
//     }
//   })

//   return (
//     <Center>
//       <Float speed={2} floatIntensity={1.5} rotationIntensity={0.5}>
//         <primitive ref={ref} object={scene} scale={0.9} />
//       </Float>
//     </Center>
//   )
// }

// // preload model
// useGLTF.preload("/models/robot.glb")

// // 🌌 Particles
// function Particles() {
//   const points = new Array(1000).fill().map(() => [
//     (Math.random() - 0.5) * 10,
//     (Math.random() - 0.5) * 6,
//     (Math.random() - 0.5) * 10,
//   ])

//   return (
//     <points>
//       <bufferGeometry>
//         <bufferAttribute
//           attach="attributes-position"
//           count={points.length}
//           array={new Float32Array(points.flat())}
//           itemSize={3}
//         />
//       </bufferGeometry>
//       <pointsMaterial size={0.02} opacity={0.7} transparent />
//     </points>
//   )
// }

// // 🎯 Main Component
// export default function Hero3D() {
//   return (
//     <div className="w-full h-[380px] md:h-[450px] relative overflow-hidden">
      
//       <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        
//         {/* 🌌 Background particles */}
//         <Particles />

//         {/* ✨ Lighting (balanced) */}
//         <ambientLight intensity={0.7} />
//         <directionalLight position={[5, 5, 5]} intensity={2} />
//         <pointLight position={[0, 2, 3]} intensity={1.5} color="#6366f1" />

//         {/* 🤖 Robot */}
//         <Suspense fallback={null}>
//           <RobotModel />
//         </Suspense>

//         {/* 🎮 Controls */}
//         <OrbitControls enableZoom={false} enablePan={false} />
//       </Canvas>

//       {/* 🌑 Clean gradient overlay */}
//       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black pointer-events-none" />
//     </div>
//   )
// }
"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, useAnimations, OrbitControls, Center, Float } from "@react-three/drei"
import { Suspense, useRef, useEffect } from "react"

// 🤖 AI Robot (LOCAL FILE)
function RobotModel() {
  const group = useRef()
  const { scene, animations } = useGLTF("/models/robot.glb")
  const { actions } = useAnimations(animations, group)

  // ▶️ play animation
  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach((action) => action.play())
    }
  }, [actions])

  // 🔄 rotation
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.002
    }
  })

  return (
    <Center>
      <Float speed={2} floatIntensity={1.2} rotationIntensity={0.4}>
        <primitive
  ref={group}
  object={scene}
  scale={0.8}          // 🔥 bigger
  position={[0, -0.6, 0]} // 🔥 move up
/>
      </Float>
    </Center>
  )
}

// preload
useGLTF.preload("/models/robot.glb")

// 🌌 Particles
function Particles() {
  const points = new Array(800).fill().map(() => [
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 6,
    (Math.random() - 0.5) * 10,
  ])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flat())}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} opacity={0.6} transparent />
    </points>
  )
}

// 🎯 Main
export default function Hero3D() {
  return (
    <div className="w-full h-[380px] md:h-[450px] relative overflow-hidden">
      
      <Canvas camera={{ position: [0, 1, 7], fov: 50 }}>
        
        <Particles />

        {/* Lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <pointLight position={[0, 2, 3]} intensity={1.5} color="#6366f1" />

        <Suspense fallback={null}>
          <RobotModel />
        </Suspense>

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black pointer-events-none" />
    </div>
  )
}