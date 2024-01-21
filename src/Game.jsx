import './styles.css'
import App from './App'
import { Perf } from 'r3f-perf'
import { KeyboardControls } from '@react-three/drei'
import EnterFace from './Enterface'
import { Canvas } from '@react-three/fiber'

export default function Game() {
    return(
        <KeyboardControls
        map={[
          { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
          { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
          { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
          { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
          { name: 'jump', keys: ['Space'] },
        ]}
      >
      <Canvas   camera={ {
                fov: 45,
                near: 0.1,
                far: 200,
                position: [ 0, 0, -100 ], 
            } } shadows>
        <App />
        <Perf position="top-left" />
      </Canvas>
    <EnterFace/>
  </KeyboardControls>
    )
}