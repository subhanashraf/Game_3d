
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export default function Space() {
    const start = useRef( [] )
    const geometry = new THREE.SphereGeometry(0.3)
    const martial = new THREE.MeshStandardMaterial({
        color: '#ffffff',
    })  
   useFrame((_,delta)=>{
    for (const iterator of start.current) {
        iterator.position.z -= delta + 1;
        iterator.rotation.y +=0.002;
        if (iterator.position.z < -100) {
            iterator.position.z = 150;
            iterator.position.z = 0;
        }
    }
   })

    return (
        <>
            
            <color args={['#000']} attach="background" />
            <ambientLight intensity={3} />
            
                {
                        [...Array(300)].map((index, value) =>
                        <mesh
                        ref={(Element)=>start.current[value]= Element}
                            key={value}
                            geometry={geometry}
                            material={martial}
                            position={[
                                (Math.random() * 100 -45),
                                (Math.random() * 100  -50),
                                (Math.random() * 100 -60),
                            ]}

                        />
                    )
                }
            

        </>
    );
}
