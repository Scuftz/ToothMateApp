// export const UpperLeftWisdomTooth = () => {
//     return(
//         <div>Clicked on upper left widsom tooth</div>
//     )
// }

import React, { useRef, Suspense, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useGLTF } from '@react-three/drei'

const CameraController = () => {
  const { camera, gl } = useThree()

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement)

    controls.minDistance = 3
    controls.maxDistance = 6
    return () => {
      controls.dispose()
    }
  }, [camera, gl])
  return null
}

const UpperLeftWisdom = ({ ...props }) => {
  const group = useRef()

  const { nodes, materials } = useGLTF('/assets/Left_Upper_Wisdom.glb')

  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0.03, -1.45, -0.03]} rotation={[-Math.PI / 2, 0, 0.06]} scale={-0.74}>
        <mesh
          geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo006_3.geometry}
          material={materials['1']}
          material-color={'lightblue'}
        />
        <mesh
          geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo006_1.geometry}
          material={materials['2']}
          material-color={'lightblue'}
        />
        <mesh
          geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo006_7.geometry}
          material={materials['3']}
          material-color={'lightblue'}
        />
        <mesh
          geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo006_8.geometry}
          material={materials['4']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo006_9.geometry}
          material={materials['5']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo006_10.geometry}
          material={materials['6']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo006_11.geometry}
          material={materials['7']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo006_12.geometry}
          material={materials['8']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo006_13.geometry}
          material={materials['9']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo006_14.geometry}
          material={materials['10']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo006_15.geometry}
          material={materials['11']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo006_16.geometry}
          material={materials['12']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo006_17.geometry}
          material={materials['13']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo006_18.geometry}
          material={materials['14']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo006_19.geometry}
          material={materials['15']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo006_20.geometry}
          material={materials['16']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo006_21.geometry}
          material={materials['17']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo006_22.geometry}
          material={materials['18']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo006_23.geometry}
          material={materials['19']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo006_24.geometry}
          material={materials['20']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo006_25.geometry}
          material={materials['21']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo006_26.geometry}
          material={materials['22']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo006_27.geometry}
          material={materials['23']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo006_28.geometry}
          material={materials['24']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo006_29.geometry}
          material={materials['25']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo006_30.geometry}
          material={materials['26']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo006_2.geometry}
          material={materials['27']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo006_4.geometry}
          material={materials['28']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo006_5.geometry}
          material={materials['29']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo006_6.geometry}
          material={materials['30']}
        />
      </group>
    </group>
  )
}

export const UpperLeftWisdomTooth = () => {
  return (
    <>
      <Canvas>
        <CameraController />
        <ambientLight intensity={0.7} />
        <spotLight intensity={1} angle={0.2} penumbra={1} position={[10, 15, 10]} />
        <Suspense fallback={null}>
          <UpperLeftWisdom />
        </Suspense>
      </Canvas>
      <div>Clicked on upper left widsom tooth</div>
    </>
  )
}
