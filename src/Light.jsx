import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Camera } from "three";
export default function Light(params) {

    const light = useRef()
    useFrame((state,delta)=>{
        // light.current.position =state.camera.position
        // console.log(light.current.position);
        // console.log(state.camera.position);
        light.current.position.z =state.camera.position.z -1
        light.current.target.position.z =state.camera.position.z
        
        light.current.target.updateMatrixWorld()
    })
    return(
        <>
        <ambientLight  intensity={1.5}/>
        <directionalLight ref={light}  intensity={3}  castShadow >
        </directionalLight>
        </>
    )
}