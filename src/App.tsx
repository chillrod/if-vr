import React, { Suspense, useState } from "react";
import {
  VRCanvas,
  Interactive,
  DefaultXRControllers,
  Hands,
} from "@react-three/xr";
import { Sky, Text, useGLTF, Image } from "@react-three/drei";
import "@react-three/fiber";

function Model(props: any) {
  const { scene } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-spruce/model.gltf"
  );
  return <primitive object={scene} {...props} />;
}

function Model2(props: any) {
  const { scene } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-lime/model.gltf"
  );
  return <primitive object={scene} {...props} />;
}

function Button(props: any, showMap: any) {
  const [hover, setHover] = useState(false);
  const [color, setColor] = useState(0x123456);

  const onSelect = () => {
    showMap(true);
  };

  return (
    <Interactive
      onSelect={onSelect}
      onHover={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <Box
        color={color}
        scale={hover ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        size={[0.4, 0.1, 0.1]}
        {...props}
      >
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.05}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Olá Inflor
        </Text>
      </Box>
    </Interactive>
  );
}

function Box({ color, size, scale, children, ...rest }: any) {
  return (
    <mesh scale={scale} {...rest}>
      <boxBufferGeometry attach="geometry" args={size} />
      <meshPhongMaterial attach="material" color={color} />
      {children}
    </mesh>
  );
}

function App() {
  const [map, showMap] = useState(false);
  return (
    <VRCanvas>
      <Sky sunPosition={[0, 10, 0]} />
      <ambientLight />
      <Hands />
      <Suspense fallback={null}>
        <Model position={[0, 0, -25]} />
        <Model2 position={[10, 0, -40]} />
      </Suspense>
      <Image scale={1} transparent url="./if.jpeg" opacity={1} />
      <Button />
      <DefaultXRControllers />
    </VRCanvas>
  );
}

export default App;
