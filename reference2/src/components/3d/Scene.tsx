'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import Model from './Model';
import SmallModel from './smallModel';
import { Environment, Preload } from '@react-three/drei';


export default function Scene() {
  return (
    <Canvas performance={{ min: 0.1, max: 1 }} style={{ backgroundColor: 'black' }}>
      <directionalLight intensity={3} position={[0, 3, 2]} />
      <Environment preset="city" />
        <SmallModel />
      <Model />
        <Preload all />
    </Canvas>
  );
}