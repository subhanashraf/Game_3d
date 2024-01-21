import Game from "./Game";
import { useControls } from "leva";
import SpaceApp from "./SpaceApp";

export default function Controls() {
        const contr = useControls('Controls',{
          Mode : {options:['Game','Space']}
        })
        console.log(contr);
    return(
        <>
        {/* Use a ternary operator to render either Game or Space based on the Mode value */}
        {contr.Mode === 'Game' ? <Game/> : <SpaceApp/>}
        </>
    );
}