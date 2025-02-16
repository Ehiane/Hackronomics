import React, { useState, useEffect, useRef } from "react";
import { Environment, OrbitControls, useFBX, useAnimations } from "@react-three/drei";
import { Suspense } from "react";

// AvatarModel component to load the 3D avatar
const AvatarModel = ({ avatarType }) => {
  const fbx = useFBX(`/${avatarType}.fbx`);
  const { actions } = useAnimations(fbx.animations, fbx); // Hook to access animations if available

  // Reference to control the model position
  const avatarRef = useRef();

  // Play animation if available
  useEffect(() => {
    if (actions) {
      actions?.[Object.keys(actions)[0]]?.play(); // Play the first animation
    }
  }, [actions]);

  return (
    <primitive
      ref={avatarRef}
      object={fbx}
      scale={0.08} // Increase size
      position={[0, -10, 0]} // Shift down on the Y-axis
    />
  );
};

// Avatar3D component
const Avatar3D = ({ savings }) => {
  // Determine avatar type based on savings (happy or normal)
  const avatarType = savings > 1000 ? "happy" : "normal"; // Example logic: if savings > 1000, show happy avatar

  return (
    <Suspense fallback={null}>
      <ambientLight intensity={1.5} />
      <AvatarModel avatarType={avatarType} /> {/* Dynamically load avatar */}
      <OrbitControls />
    </Suspense>
  );
};

export default Avatar3D;
