'use client';

import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Character3DProps {
  reduceMotion: boolean;
  waveSignal: number;
}

/**
 * Articulated, code-built 3D companion based on the supplied character:
 * black hoodie, black trousers, white sneakers and a raised waving hand.
 * Keeping the body parts separate gives the arm a real shoulder/wrist wave
 * instead of rotating a flat image of the complete character.
 */
export default function Character3D({ reduceMotion, waveSignal }: Character3DProps) {
  const characterRef = useRef<THREE.Group>(null);
  const wavingArmRef = useRef<THREE.Group>(null);
  const wavingForearmRef = useRef<THREE.Group>(null);
  const restingArmRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const waveStartedAtRef = useRef(0);
  const restartWaveRef = useRef(true);

  useEffect(() => {
    restartWaveRef.current = true;
  }, [waveSignal]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (restartWaveRef.current) {
      waveStartedAtRef.current = time;
      restartWaveRef.current = false;
    }

    const triggeredWaveTime = time - waveStartedAtRef.current;
    const isWaving = reduceMotion || triggeredWaveTime < 2.8 || time % 7 < 2.6;
    const wave = reduceMotion ? 0 : Math.sin(time * 8.5);

    if (characterRef.current) {
      const targetYaw = reduceMotion ? 0 : state.pointer.x * 0.16;
      characterRef.current.rotation.y = THREE.MathUtils.damp(
        characterRef.current.rotation.y,
        targetYaw,
        7,
        delta,
      );
      characterRef.current.position.y = reduceMotion ? -0.05 : -0.05 + Math.sin(time * 2.2) * 0.025;
    }

    if (wavingArmRef.current) {
      const targetRotation = isWaving ? 2.55 + wave * 0.13 : -0.08;
      wavingArmRef.current.rotation.z = THREE.MathUtils.damp(
        wavingArmRef.current.rotation.z,
        targetRotation,
        9,
        delta,
      );
    }

    if (wavingForearmRef.current) {
      wavingForearmRef.current.rotation.z = isWaving ? -0.4 + wave * 0.28 : 0.04;
    }

    if (restingArmRef.current) {
      restingArmRef.current.rotation.z = reduceMotion ? 0.08 : 0.08 + Math.sin(time * 2.2) * 0.035;
    }

    if (headRef.current) {
      headRef.current.rotation.z = reduceMotion ? -0.03 : -0.03 + Math.sin(time * 1.8) * 0.025;
    }
  });

  return (
    <group ref={characterRef} position={[0, -0.05, 0]} rotation={[0, -0.08, 0]}>
      {/* Legs and trousers */}
      <group position={[0, -0.82, 0]}>
        <mesh position={[-0.23, -0.35, 0]} castShadow>
          <capsuleGeometry args={[0.17, 0.66, 6, 14]} />
          <meshStandardMaterial color="#11151d" roughness={0.9} />
        </mesh>
        <mesh position={[0.23, -0.35, 0]} castShadow>
          <capsuleGeometry args={[0.17, 0.66, 6, 14]} />
          <meshStandardMaterial color="#11151d" roughness={0.9} />
        </mesh>

        {/* White high-top sneakers */}
        <group position={[-0.24, -0.88, 0.08]}>
          <mesh position={[0, 0, 0.08]} castShadow>
            <boxGeometry args={[0.38, 0.22, 0.62]} />
            <meshStandardMaterial color="#eef3f7" roughness={0.65} />
          </mesh>
          <mesh position={[0, -0.12, 0.09]}>
            <boxGeometry args={[0.42, 0.08, 0.66]} />
            <meshStandardMaterial color="#202735" roughness={0.75} />
          </mesh>
          <mesh position={[0, 0.02, 0.4]}>
            <boxGeometry args={[0.24, 0.05, 0.03]} />
            <meshStandardMaterial color="#e35b66" />
          </mesh>
        </group>
        <group position={[0.24, -0.88, 0.08]}>
          <mesh position={[0, 0, 0.08]} castShadow>
            <boxGeometry args={[0.38, 0.22, 0.62]} />
            <meshStandardMaterial color="#eef3f7" roughness={0.65} />
          </mesh>
          <mesh position={[0, -0.12, 0.09]}>
            <boxGeometry args={[0.42, 0.08, 0.66]} />
            <meshStandardMaterial color="#202735" roughness={0.75} />
          </mesh>
          <mesh position={[0, 0.02, 0.4]}>
            <boxGeometry args={[0.24, 0.05, 0.03]} />
            <meshStandardMaterial color="#e35b66" />
          </mesh>
        </group>
      </group>

      {/* Hoodie body */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <capsuleGeometry args={[0.5, 0.58, 8, 20]} />
        <meshStandardMaterial color="#151922" roughness={0.82} metalness={0.04} />
      </mesh>
      <mesh position={[0, 0.58, -0.03]}>
        <torusGeometry args={[0.37, 0.11, 10, 28]} />
        <meshStandardMaterial color="#1c212c" roughness={0.88} />
      </mesh>
      <mesh position={[0, -0.18, 0.49]}>
        <boxGeometry args={[0.52, 0.25, 0.05]} />
        <meshStandardMaterial color="#202632" roughness={0.8} />
      </mesh>
      <mesh position={[-0.1, 0.28, 0.49]}>
        <cylinderGeometry args={[0.014, 0.014, 0.39, 8]} />
        <meshStandardMaterial color="#cbd5e1" />
      </mesh>
      <mesh position={[0.1, 0.28, 0.49]}>
        <cylinderGeometry args={[0.014, 0.014, 0.39, 8]} />
        <meshStandardMaterial color="#cbd5e1" />
      </mesh>

      {/* Resting arm */}
      <group ref={restingArmRef} position={[-0.52, 0.43, 0]} rotation={[0, 0, 0.08]}>
        <mesh position={[0, -0.34, 0]} castShadow>
          <capsuleGeometry args={[0.15, 0.44, 6, 14]} />
          <meshStandardMaterial color="#171b24" roughness={0.88} />
        </mesh>
        <mesh position={[0, -0.77, 0.01]} castShadow>
          <sphereGeometry args={[0.16, 16, 12]} />
          <meshStandardMaterial color="#bd744f" roughness={0.78} />
        </mesh>
      </group>

      {/* Articulated waving arm: shoulder and forearm animate independently */}
      <group ref={wavingArmRef} position={[0.52, 0.43, 0]} rotation={[0, 0, 2.55]}>
        <mesh position={[0, -0.27, 0]} castShadow>
          <capsuleGeometry args={[0.15, 0.3, 6, 14]} />
          <meshStandardMaterial color="#171b24" roughness={0.88} />
        </mesh>
        <group ref={wavingForearmRef} position={[0, -0.54, 0]} rotation={[0, 0, -0.4]}>
          <mesh position={[0, -0.18, 0]} castShadow>
            <capsuleGeometry args={[0.14, 0.24, 6, 14]} />
            <meshStandardMaterial color="#171b24" roughness={0.88} />
          </mesh>
          <mesh position={[0, -0.48, 0.01]} castShadow>
            <sphereGeometry args={[0.17, 16, 12]} />
            <meshStandardMaterial color="#bd744f" roughness={0.78} />
          </mesh>
        </group>
      </group>

      {/* Neck and head */}
      <mesh position={[0, 0.82, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.18, 0.28, 16]} />
        <meshStandardMaterial color="#b96e4a" roughness={0.8} />
      </mesh>
      <group ref={headRef} position={[0, 1.25, 0]} rotation={[0, 0, -0.03]}>
        <mesh castShadow scale={[0.9, 1.06, 0.86]}>
          <sphereGeometry args={[0.46, 24, 20]} />
          <meshStandardMaterial color="#c47a53" roughness={0.78} />
        </mesh>
        <mesh position={[-0.43, -0.01, 0]} scale={[0.7, 1, 0.55]}>
          <sphereGeometry args={[0.13, 14, 10]} />
          <meshStandardMaterial color="#b96e4a" roughness={0.8} />
        </mesh>
        <mesh position={[0.43, -0.01, 0]} scale={[0.7, 1, 0.55]}>
          <sphereGeometry args={[0.13, 14, 10]} />
          <meshStandardMaterial color="#b96e4a" roughness={0.8} />
        </mesh>

        {/* Eyes, brows, nose and smile */}
        <mesh position={[-0.16, 0.06, 0.4]}>
          <sphereGeometry args={[0.052, 12, 10]} />
          <meshStandardMaterial color="#1a1110" roughness={0.35} />
        </mesh>
        <mesh position={[0.16, 0.06, 0.4]}>
          <sphereGeometry args={[0.052, 12, 10]} />
          <meshStandardMaterial color="#1a1110" roughness={0.35} />
        </mesh>
        <mesh position={[-0.16, 0.15, 0.4]} rotation={[0, 0, -0.15]}>
          <boxGeometry args={[0.16, 0.025, 0.025]} />
          <meshStandardMaterial color="#3b211b" />
        </mesh>
        <mesh position={[0.16, 0.15, 0.4]} rotation={[0, 0, 0.15]}>
          <boxGeometry args={[0.16, 0.025, 0.025]} />
          <meshStandardMaterial color="#3b211b" />
        </mesh>
        <mesh position={[0, -0.05, 0.43]} scale={[0.55, 0.8, 0.5]}>
          <sphereGeometry args={[0.075, 12, 10]} />
          <meshStandardMaterial color="#a95f43" roughness={0.85} />
        </mesh>
        <mesh position={[0, -0.2, 0.42]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.09, 0.014, 8, 18, Math.PI]} />
          <meshStandardMaterial color="#5b2b27" />
        </mesh>

        {/* Layered wavy hair */}
        <mesh position={[0, 0.26, -0.02]} scale={[1.03, 0.55, 1]} castShadow>
          <sphereGeometry args={[0.46, 20, 16]} />
          <meshStandardMaterial color="#3d241d" roughness={0.92} />
        </mesh>
        {[-0.32, -0.12, 0.1, 0.3].map((x, index) => (
          <mesh
            key={x}
            position={[x, 0.43 + (index % 2) * 0.04, 0.02]}
            rotation={[0.18, 0, x * -0.75]}
            castShadow
          >
            <coneGeometry args={[0.17, 0.32, 12]} />
            <meshStandardMaterial color={index % 2 ? '#563127' : '#43271f'} roughness={0.9} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
