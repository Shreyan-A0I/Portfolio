import { useGLTF, Text, MeshTransmissionMaterial } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useRef, useState, useEffect } from 'react';
import { Mesh } from 'three';

export default function SmallModel() {
  const mesh = useRef<Mesh>(null);
  const { nodes } = useGLTF("/donut2.glb");
  const { viewport } = useThree();
  const [isRotating, setIsRotating] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [materialProps, setMaterialProps] = useState({
    thickness: 1.7,
    roughness: 0.4,
    transmission: 1.0,
    ior: 1.1,
    chromaticAberration: 0.02,
    backside: true,
  });

  useFrame(() => {
    if (mesh.current && isRotating) {
      mesh.current.position.z = -7;
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
      mesh.current.rotation.z += 0.005;
    }

    const { x, y } = mousePosition;
    const normalizedX = (x / window.innerWidth) * 2 - 1;
    var normalizedY = -(y / window.innerHeight) * 2 + 1;

    setMaterialProps((prevProps) => ({
      ...prevProps,
      thickness: normalizedX,
      chromaticAberration: normalizedY,
    }));
  });

  useEffect(() => {
    const handleClick = () => {
      setIsRotating((prevIsRotating) => !prevIsRotating);
    };

    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <group scale={1 * (viewport.width / 3.5)}>
      <Text
        fontSize={1.5}
        font="/fonts/PPNeueMontreal-Bold.otf"
        position={[0, 0, -6]}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Hi I&apos;m Ravi
        
      </Text>
      <Text
              fontSize={0.7}
              font="/fonts/PPNeueMontreal-Bold.otf"
              position={[0, -3, -20]}
              color="silver"
              anchorX="center"
            anchorY="middle"
      >
      Audio X AI  |  Full Stack  |  Music Production
      </Text>
      <mesh ref={mesh} {...nodes.Torus}>
        <MeshTransmissionMaterial {...materialProps} />
		  </mesh>
    </group>
  );
}