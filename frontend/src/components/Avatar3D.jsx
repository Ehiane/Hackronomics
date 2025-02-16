import React from "react";
import { useLoader } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useFBX } from "@react-three/drei";
import { Suspense } from "react";



function AvatarModel() {
  const fbx = useFBX('/avatar.fbx')
  return <primitive object={fbx} />
};

const Avatar3D = () => {
  return (
    <Canvas>
      <ambientLight intensity={1.5} />
      <Suspense fallback={<div>Loading...</div>}>
        <AvatarModel />
      </Suspense>
    </Canvas>
  );
};

export default Avatar3D;