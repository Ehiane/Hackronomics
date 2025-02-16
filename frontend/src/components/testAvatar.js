import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useFBX } from "@react-three/drei";
import { Suspense } from "react";

const TestModel = () => {
  const fbx = useFBX("/testavatar.fbx");

  if (!fbx) {
    return <div>Loading...</div>;  // or any loading indicator you prefer
  }

  return <primitive object={fbx} scale={0.01} position={[0, -1, 0]} />;
};


const Test3D = () => {
  return (
    <Canvas style={{ width: "100%", height: "300px" }} camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <Suspense fallback={<div>Loading 3D model...</div>}>
        <TestModel />
      </Suspense>
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </Canvas>
  );
};

export default Test3D;