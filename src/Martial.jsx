import { Text, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { CuboidCollider, RigidBody } from '@react-three/rapier'
import { Perf } from 'r3f-perf'
import { useMemo, useRef, useState } from 'react'
import *as THREE from 'three'


const box = new THREE.BoxGeometry(1, 1, 1)
let startfloor = new THREE.MeshStandardMaterial({color: '#435c47' })
let midfloor = new THREE.MeshStandardMaterial({ color: '#4f5655', })
let trap = new THREE.MeshStandardMaterial({color: '#ff0000', metalness: 0, roughness: 1})
let wal = new THREE.MeshStandardMaterial({ color: '#887777', metalness: 0, roughness: 0 })




function Startfloor({ position = [0, 0, 0] }) {
    return (
        <>
        <mesh geometry={box} scale={[4, 0.2, 4]} material={startfloor} position={position} receiveShadow />
        <Text color='black' position={[0,1,1]} scale={0.5}  rotation={[-1,Math.PI *1,0]}>
             Start Game
             <meshNormalMaterial/>
             </Text>
        </>
    );
  
}


function Endfloor({ position = [0, 0, 0] }) {
    
    return <>
        <mesh geometry={box} scale={[4, 0.2, 4]} material={startfloor} position={[position[0], position[1] , position[2] ]} receiveShadow  ></mesh>
        <mesh geometry={box} scale={[0.2, 1.5, 4]} castShadow material={wal} position={[position[0], position[1] + 0.75, position[2] + 2]} rotation={[0, Math.PI * 1.5, 0]} ></mesh>
        <RigidBody colliders='hull' type='fixed' >
            <Text color='#305420' position={[position[0], position[1] +1 , position[2]]} scale={0.5}  rotation={[0,Math.PI *1,0]}>
            Finish
            </Text>
        </RigidBody>
    <CuboidCollider args={[0.2, 1, 2]}  position={[position[0], position[1] + 0.75, position[2] + 2]}  rotation={[0, Math.PI * 1.5, 0]} friction={5} restitution={0} ></CuboidCollider>
    </>
}






function Medialfloorone({ position = [0, 0, 0] }) {
    const rotationx = useRef()
    const [randomnumber] = useState(() => (Math.random()) * (Math.random() < 0.5 ? -1 : 1))
    useFrame((state) => {
        let time = state.clock.getElapsedTime()
        let quaternion = new THREE.Quaternion();
        quaternion.setFromEuler(new THREE.Euler(0, time * randomnumber, 0))
        rotationx.current.setRotation(quaternion)
    })
    return <>
        <group position={position}>
            <mesh geometry={box} scale={[4, 0.2, 4]} material={midfloor} receiveShadow  ></mesh>
            <RigidBody ref={rotationx} type='kinematicPosition' position={[0, 0.3, 0]} friction={0.7} restitution={0.3}>
                <mesh geometry={box} material={trap} scale={[3, 0.3, 0.3]} castShadow receiveShadow ></mesh>
            </RigidBody>
        </group>
    </>
}







function Medialfloortwo({ position = [0, 0, 0] }) {
    const rotationy = useRef()
    const [randomnumber] = useState(() => (Math.random() ) * (Math.PI * 1))
    useFrame((state) => {
        let time = state.clock.getElapsedTime()
        let y = Math.sin(time * randomnumber) + 1.3
        rotationy.current.setTranslation({ x: position[0], y: position[1] + y, z: position[2] })

    })
    return <>
        <group position={position}>
            <mesh geometry={box} scale={[4, 0.2, 4]} material={midfloor} receiveShadow />
            <RigidBody ref={rotationy} type='kinematicPosition' position={[0, 0.3, 0]}  friction={0.7} restitution={0.3}>
                <mesh geometry={box} material={trap} scale={[3, 0.3, 0.3]} castShadow receiveShadow ></mesh>
            </RigidBody>
        </group>
    </>
}






function Medialfloorthree({ position = [0, 0, 0] }) {
    const rotationz = useRef()
    const [randomnumber] = useState(() => (Math.random() ) * (Math.PI * 1))
    useFrame((state) => {
        let time = state.clock.getElapsedTime()
        let x = Math.sin(time * randomnumber)
        rotationz.current.setTranslation({ x: position[0] + x, y: position[1] + 0.7, z: position[2] })
    })
    return <>
        <group position={position}>
            <mesh geometry={box} scale={[4, 0.2, 4]} material={midfloor} receiveShadow />
            <RigidBody ref={rotationz} type='kinematicPosition' position={[0, 0.5, 0]}  friction={0.7} restitution={0.3}>
                <mesh geometry={box} material={trap} scale={[1.5, 1.4, 0.2]} castShadow receiveShadow />
            </RigidBody>
        </group>
    </>
}




function Wallleft({ Size = 1, position = [0, 0, 0] }) {
    return (<>
        <mesh geometry={box} scale={[0.2, 1.5, Size * 4]} position={[-2, 0.7, (((Size * 2) + 2) - 4)]}  material={wal} castShadow  receiveShadow />
        <mesh geometry={box} scale={[0.2, 1.5, Size * 4]} position={[2, 0.7, (((Size * 2) + 2) - 4)]} material={wal} castShadow receiveShadow />
        <CuboidCollider position={[0, 0, (((Size * 2) + 2) - 4)]} args={[0.1, 2, Size * 2]} rotation={[0,0,Math.PI * 0.5]}  friction={0.7} restitution={0.3}/>
        <CuboidCollider position={[0, 2, (((Size * 2) + 2) - 4)]} args={[0.1, 2, Size * 2]} rotation={[0,0,Math.PI * 0.5]}  friction={0.7} restitution={0.3} ></CuboidCollider>
        <CuboidCollider position={[2, 0.75, (((Size * 2) + 2) - 4)]} args={[0.1,0.8, Size * 2]} friction={0.7} restitution={0.3} />
        <CuboidCollider position={[-2, 0.75, (((Size * 2) + 2) - 4)]} args={[0.1,0.8, Size * 2]} friction={0.7} restitution={0.3} />
    </>)
}



export default function Level({ count = 10, type = [Medialfloorone, Medialfloortwo, Medialfloorthree] }) {
    const sean = useMemo(() => {
        let sean = []
        for (let i = 0; i < count; i++) {
            let types = parseInt(Math.random() * type.length)
            sean.push(type[types])
        }
        
        return sean;
    }, [])
    return (
        <>
            {/* <Perf/> */}

            <Startfloor position={[0, 0, 0]} />
            {sean.map((Seans, index) => <Seans key={index} position={[0, 0, (index + 1) * 4]} />)}
            <Endfloor position={[0, 0, (count + 1) * 4]} />//
            <Wallleft Size={count + 2} position={[0, 0.75, (count * 5) + 2]} />


        </>
    );
}
