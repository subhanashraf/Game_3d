import { Canvas } from "@react-three/fiber";
import Space from "./Space";
import { Text } from "@react-three/drei";
import { useControls } from "leva";
export default function SpaceApp(params) {
    const controle = useControls('Text', {
        Text: true,
    })
    return (
        <>


            <Canvas camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [0, 0, -100],
            }} shadows>
                <Space />
                {controle.Text && <Text color='white' fontSize={10} rotation={[0, Math.PI * 1, 0]}>
                To infinity and Beyond
                </Text>}

            </Canvas>
        </>
    )
}