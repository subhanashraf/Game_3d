import { RigidBody, useRapier, } from "@react-three/rapier";
import { useKeyboardControls, useAnimations } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three'
import useGame from "./stores/useGame";


export default function Plyers() {
  const [sub, get] = useKeyboardControls()
  const rigidBodyRef = useRef()

  const [smoothedCameraPosition] = useState(() => new THREE.Vector3(10, 10, 10))
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3())

  const start = useGame((state) => state.start)
  const end = useGame((state) => state.end)
  const restart = useGame((state) => state.restart)
  const phasedata = useGame((start) => start.phase)
  const blocksCount = useGame((start) => start.blocksCount)



  function Jump() {

    const origin = rigidBodyRef.current.translation()

    if (origin.y < 0.5) {
      rigidBodyRef.current.applyImpulse({ x: 0, y: 0.3, z: 0 })
    }
  }
  const reset = () => {
    rigidBodyRef.current.setTranslation({ x: 0, y: 1, z: 0 })
    rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 })
    rigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 })
  }

  useEffect(() => {

    const unsubscribeJump = sub(
      (state) => state.jump,
      (value) => {
        if (value) {
          Jump()

        }
      }
    )
    const startsubscribe = sub(
      () => {
        start()

      }
    )
    const unsubscribeReset = useGame.subscribe(
      (state) => state.phase,
      (value) => {
        if (value === 'ready')
          reset()
      }
    )
    return () => {
      unsubscribeJump()
      startsubscribe()
      unsubscribeReset()
    }
  })

  useFrame((state, delta) => {
    const { forward, backward, leftward, rightward } = get()

    const impulse = { x: 0, y: 0, z: 0 }
    const torque = { x: 0, y: 0, z: 0 }

    const impulseStrength = 0.6 * delta
    const torqueStrength = 0.2 * delta

    if (forward) {
      impulse.z += impulseStrength
      torque.x += torqueStrength
    }

    if (rightward) {
      impulse.x -= impulseStrength
      torque.z += torqueStrength
    }

    if (backward) {
      impulse.z -= impulseStrength
      torque.x -= torqueStrength
    }

    if (leftward) {
      impulse.x += impulseStrength
      torque.z -= torqueStrength
    }

    rigidBodyRef.current.applyImpulse(impulse)
    rigidBodyRef.current.applyTorqueImpulse(torque)


    // group.current.applyImpulse(impulse)
    // group.current.applyImpulse(impulse);
    // group.current.applyTorqueImpulse(torque *5)


    const bodyPosition = rigidBodyRef.current.translation()

    const cameraPosition = new THREE.Vector3()
    cameraPosition.copy(bodyPosition)
    cameraPosition.z -= 2.25
    cameraPosition.y += 0.65

    const cameraTarget = new THREE.Vector3()
    cameraTarget.copy(bodyPosition)
    cameraTarget.y += 0.25

    smoothedCameraPosition.lerp(cameraPosition, 5 * delta)
    smoothedCameraTarget.lerp(cameraTarget, 5 * delta)

    state.camera.position.copy(smoothedCameraPosition)
    state.camera.lookAt(smoothedCameraTarget)

    if (bodyPosition.z > (blocksCount * 4) + 2) {
      end()

    }
    if (bodyPosition.y < - 4) {
      restart()
      reset()

    }
  })


  return (
    <>
     
      <RigidBody 
      ref={rigidBodyRef} 
      colliders='ball'
      linearDamping={0.5}
      angularDamping={0.5}
      position={[0, 1, 0]}
      >
        <mesh castShadow >
          <icosahedronGeometry args={[0.3,3]} />
          <meshStandardMaterial  flatShading color='purple' />
        </mesh>
      </RigidBody>
    </>
  );
}




