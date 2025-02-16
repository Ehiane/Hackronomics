import React from "react";
import { Environment, OrbitControls, useFBX, useAnimations } from "@react-three/drei";
import { Suspense, useRef } from "react";

// AvatarModel component to load the 3D avatar
const AvatarModel = () => {
  const fbx = useFBX("/avatar.fbx");
  const { actions } = useAnimations(fbx.animations, fbx); // Hook to access animations if available

  // Reference to control the model position
  const avatarRef = useRef();

  // Play animation if available
  React.useEffect(() => {
    if (actions) {
      actions?.[Object.keys(actions)[0]]?.play(); // Play the first animation
    }
  }, [actions]);

  return (
    <primitive 
      ref={avatarRef} 
      object={fbx} 
      scale={0.08} // Increase size
      position={[0, -12, 0]} // Shift down on the Y-axis
    />
  );
};

// Avatar3D component
const Avatar3D = () => {
  return (
    <Suspense fallback={null}>
      <ambientLight intensity={1.5} />
      <AvatarModel />
      <OrbitControls />
    </Suspense>
  );
};

export default Avatar3D;
