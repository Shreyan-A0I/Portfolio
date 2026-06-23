import { useGLTF, MeshTransmissionMaterial, meshBounds } from '@react-three/drei';
import { useFrame, useThree  } from '@react-three/fiber'; // meshBounds
import React, { useRef, useState, useEffect } from 'react';
import { Mesh } from 'three';

export default function Model() {
 const mesh = useRef<Mesh>(null);
 const { nodes } = useGLTF("/donut2.glb");
 const { viewport } = useThree();
 const [materialProps, setMaterialProps] = useState({
    backside: true,
    chromaticAberration: 0.11,
    ior: 1.4,
    roughness: 0.42938770874232757,
    thickness: 2.347200000000001,
    transmission: 1,
 });

 useFrame(() => {
    if (mesh.current) {
      mesh.current.position.z = 0;
      mesh.current.rotation.x += 0.00035;
      mesh.current.rotation.y += 0.00035;
      mesh.current.rotation.z += 0.00005;
      console.log(materialProps);
    }
 });

 useEffect(() => {
    const handleClick = () => {
      setMaterialProps((prevProps) => ({
        ...prevProps,
        roughness: Math.random(),
      }));
    };

    const handleScroll = (event: WheelEvent) => {
      const delta = event.deltaY * 0.0007;
      setMaterialProps((prevProps) => ({
        ...prevProps,
        thickness: Math.max(0, Math.min(3, prevProps.thickness + delta)),
      }));
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('wheel', handleScroll);
    };
 }, []);

 return (
    <group scale={50 * (viewport.width / 3.5)}>
      <mesh ref={mesh} {...nodes.Torus} raycast={meshBounds}> {}
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
 );
}
