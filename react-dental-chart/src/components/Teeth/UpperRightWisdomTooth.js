

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

const UpperRightWisdom = ({ ...props }) => {
  const group = useRef()

  const { nodes, materials } = useGLTF('/assets/Right_Upper_Wisdom.glb')

  return (
    <group ref={group} {...props} dispose={null}>
        <group position={[0.03, -1.45, -0.03]} rotation={[Math.PI / 2, 0, 1.69]} scale={0.74}>
        <mesh geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo030.geometry} material={materials['29']} />
        <mesh geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo030_1.geometry} material={materials['30']} />
        <mesh geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo030_2.geometry} material={materials['1']} material-color={'lightgreen'}/>
        <mesh geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo030_3.geometry} material={materials['2']} />
        <mesh geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo030_4.geometry} material={materials['3']} />
        <mesh geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo030_5.geometry} material={materials['4']} />
        <mesh geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo030_6.geometry} material={materials['5']} />
        <mesh geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo030_7.geometry} material={materials['6']} />
        <mesh geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo030_8.geometry} material={materials['7']} />
        <mesh geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo030_9.geometry} material={materials['8']} />
        <mesh geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo030_10.geometry} material={materials['9']} />
        <mesh geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo030_11.geometry} material={materials['10']} />
        <mesh geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo030_12.geometry} material={materials['11']} />
        <mesh geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo030_13.geometry} material={materials['12']} />
        <mesh geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo030_14.geometry} material={materials['13']} />
        <mesh geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo030_15.geometry} material={materials['14']} />
        <mesh geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo030_16.geometry} material={materials['15']} />
        <mesh geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo030_17.geometry} material={materials['16']} />
        <mesh geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo030_18.geometry} material={materials['17']} />
        <mesh geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo030_19.geometry} material={materials['18']} />
        <mesh geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo030_20.geometry} material={materials['19']} />
        <mesh geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo030_21.geometry} material={materials['20']} />
        <mesh geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo030_22.geometry} material={materials['21']} />
        <mesh geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo030_23.geometry} material={materials['22']} />
        <mesh geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo030_24.geometry} material={materials['23']} />
        <mesh geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo030_25.geometry} material={materials['24']} />
        <mesh geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo030_26.geometry} material={materials['25']} />
        <mesh geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo030_27.geometry} material={materials['26']} />
        <mesh geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo030_28.geometry} material={materials['27']} />
        <mesh geometry={nodes.Human_Teeth_Upper_Third_Molar_Wisdom_Geo030_29.geometry} material={materials['28']} />
      </group>
    </group>
  )
}


export const UpperRightWisdomTooth = () => {
    return (
        <>
          <Canvas>
            <CameraController />
            <ambientLight intensity={0.7} />
            <spotLight intensity={1} angle={0.2} penumbra={1} position={[10, 15, 10]} />
            <Suspense fallback={null}>
              <UpperRightWisdom />
            </Suspense>
          </Canvas>
          <div>Clicked on upper right wisdom tooth</div> 
        </>
      )
}
