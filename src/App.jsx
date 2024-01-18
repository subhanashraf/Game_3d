import { Physics } from "@react-three/rapier";
import Level from "./Martial";
import Light from './Light';
import { OrbitControls } from "@react-three/drei";
import Plyers from "./Plyers";
import useGame from "./stores/useGame";
export default function App() {
  const countblock= useGame((state)=> state.blocksCount )
    return(
        <>
        {/* <OrbitControls/> */}
        <Physics >
      <Level count={countblock}/>
      <Plyers/>

        </Physics>
        <Light/>
     <color args={['#bdedcf']} attach="background"/>
        </>
    );
}