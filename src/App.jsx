import { Physics } from "@react-three/rapier";
import Level from "./Martial";
import Light from './Light';

import Plyers from "./Plyers";
import useGame from "./stores/useGame";
import Effects from "./Effects";
export default function App() {
  const countblock= useGame((state)=> state.blocksCount )
    return(
        <>
        <Physics >
      <Level count={countblock}/>
      <Plyers/>

        </Physics>
        <Light/>
        <Effects/>
        <color args={ [ '#252731' ] } attach="background" /> 
        </>
    );
}