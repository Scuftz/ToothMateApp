import React, { useRef, Suspense, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useGLTF } from '@react-three/drei'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const CameraController = () => {
  const { camera, gl } = useThree()

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement)

    controls.minDistance = 3
    controls.maxDistance = 4
    return () => {
      controls.dispose()
    }
  }, [camera, gl])
  return null
}

const LeftLowerSecondMolar = ({ ...props }) => {
  const group = useRef()

  const { nodes, materials } = useGLTF('/assets/Left_Lower_Second_Molar.glb')

  return (
    <group ref={group} {...props} dispose={null}>
      {' '}
      <group position={[0, -1.67, 0]} rotation={[Math.PI / 2, 0, -Math.PI]} scale={0.46}>
        <mesh
          geometry={nodes.Human_Teeth_Lower_Second_Molar_Geo_1.geometry}
          material={materials['1']}
          material-color={'lightblue'}
        />
        <mesh
          geometry={nodes.Human_Teeth_Lower_Second_Molar_Geo_2.geometry}
          material={materials['2']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Lower_Second_Molar_Geo_3.geometry}
          material={materials['3']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Lower_Second_Molar_Geo_4.geometry}
          material={materials['4']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Lower_Second_Molar_Geo_5.geometry}
          material={materials['5']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Lower_Second_Molar_Geo_6.geometry}
          material={materials['6']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Lower_Second_Molar_Geo_7.geometry}
          material={materials['7']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Lower_Second_Molar_Geo_8.geometry}
          material={materials['8']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Lower_Second_Molar_Geo_9.geometry}
          material={materials['9']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Lower_Second_Molar_Geo_10.geometry}
          material={materials['10']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Lower_Second_Molar_Geo_11.geometry}
          material={materials['11']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Lower_Second_Molar_Geo_12.geometry}
          material={materials['12']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Lower_Second_Molar_Geo_13.geometry}
          material={materials['13']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Lower_Second_Molar_Geo_14.geometry}
          material={materials['14']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Lower_Second_Molar_Geo_15.geometry}
          material={materials['15']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Lower_Second_Molar_Geo_16.geometry}
          material={materials['16']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Lower_Second_Molar_Geo_17.geometry}
          material={materials['17']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Lower_Second_Molar_Geo_18.geometry}
          material={materials['18']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Lower_Second_Molar_Geo_19.geometry}
          material={materials['19']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Lower_Second_Molar_Geo_20.geometry}
          material={materials['20']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Lower_Second_Molar_Geo_21.geometry}
          material={materials['21']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Lower_Second_Molar_Geo_22.geometry}
          material={materials['22']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Lower_Second_Molar_Geo_23.geometry}
          material={materials['23']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Lower_Second_Molar_Geo_24.geometry}
          material={materials['24']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Lower_Second_Molar_Geo_25.geometry}
          material={materials['25']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Lower_Second_Molar_Geo_26.geometry}
          material={materials['26']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Lower_Second_Molar_Geo_27.geometry}
          material={materials['27']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Lower_Second_Molar_Geo_28.geometry}
          material={materials['28']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Lower_Second_Molar_Geo_29.geometry}
          material={materials['29']}
        />
        <mesh
          geometry={nodes.Human_Teeth_Lower_Second_Molar_Geo_30.geometry}
          material={materials['30']}
        />
      </group>
    </group>
  )
}

export const LowerLeftSecondMolar = () => {
  const back = () =>{
    return  window.history.back()
  }
  return (
    <>
     <ArrowBackIcon
        onClick={back}
        style={{ marginTop: 10, marginLeft: 10, alignSelf: ['flex-start'] }}
      />
      <Canvas>
        <CameraController />
        <ambientLight intensity={0.7} />
        <spotLight intensity={1} angle={0.2} penumbra={1} position={[10, 15, 10]} />
        <Suspense fallback={null}>
          <LeftLowerSecondMolar />
        </Suspense>
      </Canvas>
      <div>Clicked on lower left second molar</div>
    </>
  )
}
