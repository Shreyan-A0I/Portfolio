import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Box: React.FC = () => {
	const boxRef = useRef<THREE.Mesh>(null);
	const [clicked, setClicked] = useState(false);
	const [pointerEntered, setPointerEntered] = useState(false);
	const [color, setColor] = useState("#41B06E");
	const [pointerLeft, setPointerLeft] = useState(false);

  	useFrame(() => {
		if (boxRef.current && clicked) {
		boxRef.current.rotation.x += 0.001;
			boxRef.current.rotation.y += 0.001;
			boxRef.current.rotation.z += 0.004;
		}
	});
	
	const handleClick = () => {
		setClicked(!clicked);
		setColor("#41B06E");
	}
	const pointerEnteredHandler = () => {
		setPointerEntered(!pointerEntered);
		setColor("#8DECB4");
	}
	
	const onPointerLeave = () => {
		setPointerLeft(!pointerLeft);
		setColor("#41B06E");
  	}

	return (
		<mesh ref={boxRef}  onClick={handleClick} onPointerEnter={pointerEnteredHandler} onPointerLeave={onPointerLeave}>
		<boxGeometry args={[-0.9, 0.5, 1]} />
		<meshStandardMaterial color={color}  />
		</mesh>
	);
};

export default Box;