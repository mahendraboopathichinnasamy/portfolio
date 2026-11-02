'use client';

/**
 * Character3D – 3D GLB Companion Model Loader & Controller
 *
 * Loads the 3D model from `/models/portfolio-boy.glb` using `@react-three/drei`:
 * - Renders volumetric 3D curved geometry with PBR normal mapping & roughness
 * - Real-time 3D cursor tracking (yaw, pitch, bank)
 * - Plays embedded GLB animations (idle, jump, wave) via useAnimations
 * - Dynamic ground contact shadow on footer line beneath sneakers
 * - Interactive cursor specular light creating moving gleams across the 3D surface
 */

import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import type { AnimState } from './PetController';

interface Character3DProps {
  animState: AnimState;
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
}

export default function Character3D({ animState, mousePos }: Character3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const shadowRef = useRef<THREE.Mesh>(null);
  const cursorLightRef = useRef<THREE.PointLight>(null);

  // Load the generated 3D GLB model
  const gltf = useGLTF('/models/portfolio-boy.glb');
  const { actions, names } = useAnimations(gltf.animations, groupRef);

  // Clone scene so multiple mounts never clash
  const model = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  // Jump animation state tracking
  const jumpTime = useRef(0);
  const prevAnimState = useRef(animState);

  // Manage embedded GLTF animations
  useEffect(() => {
    if (!actions) return;

    if (animState === 'wave' && actions['wave']) {
      actions['wave'].reset().fadeIn(0.2).play();
    } else if (actions['idle']) {
      actions['idle'].reset().fadeIn(0.2).play();
    }

    return () => {
      actions['wave']?.fadeOut(0.2);
    };
  }, [animState, actions]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const t = state.clock.getElapsedTime();

    // Trigger jump timer when animState switches to 'jump'
    if (animState === 'jump' && prevAnimState.current !== 'jump') {
      jumpTime.current = 0.001;
      if (actions['jump']) {
        actions['jump'].reset().setLoop(THREE.LoopOnce, 1).play();
      }
    }
    prevAnimState.current = animState;

    // Smooth real-time 3D cursor tracking (turns head and torso toward cursor)
    const targetYaw = mousePos.current.x * 0.42; // Yaw (turn left / right)
    const targetPitch = -mousePos.current.y * 0.2; // Pitch (look up / down)
    const targetRoll = -mousePos.current.x * 0.05; // Bank / subtle tilt

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetYaw, 0.09);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetPitch, 0.09);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRoll, 0.09);

    // Dynamic 3D specular light following cursor position
    if (cursorLightRef.current) {
      cursorLightRef.current.position.x = mousePos.current.x * 1.5;
      cursorLightRef.current.position.y = -mousePos.current.y * 1.2 + 0.3;
    }

    // Natural 3D idle breathing & micro-hover
    const idleY = Math.sin(t * 2.8) * 0.025;
    const breathScale = 1 + Math.sin(t * 2.8) * 0.015;

    let jumpOffsetY = 0;
    let jumpScaleX = 1;
    let jumpScaleY = 1;
    let jumpRotZ = 0;

    if (jumpTime.current > 0) {
      jumpTime.current += delta * 2.6;
      const progress = jumpTime.current;
      if (progress < Math.PI) {
        jumpOffsetY = Math.sin(progress) * 0.45; // Jump height
        jumpScaleY = 1 + Math.sin(progress) * 0.14; // Squash & stretch
        jumpScaleX = 1 - Math.sin(progress) * 0.08;
        jumpRotZ = Math.sin(progress * 2) * 0.08;
      } else {
        jumpTime.current = 0;
      }
    }

    // Playful sway when celebrating or waving
    let swayZ = 0;
    if (animState === 'wave' || animState === 'celebrate') {
      swayZ = Math.sin(t * 5.2) * 0.05;
    }

    groupRef.current.position.y = -0.05 + idleY + jumpOffsetY;
    groupRef.current.scale.set(jumpScaleX, jumpScaleY * breathScale, 1);
    groupRef.current.rotation.z = targetRoll + swayZ + jumpRotZ;

    // Dynamic ground contact shadow (shrinks and fades as character jumps)
    if (shadowRef.current) {
      const shadowScale = Math.max(0.3, 1 - jumpOffsetY * 1.6);
      shadowRef.current.scale.set(shadowScale, shadowScale, 1);
      const shadowMat = shadowRef.current.material as THREE.MeshBasicMaterial;
      if (shadowMat) {
        shadowMat.opacity = Math.max(0.1, 0.42 - jumpOffsetY * 0.65);
      }
    }
  });

  return (
    <>
      {/* Interactive cursor specular light that creates moving gleams across the 3D surface */}
      <pointLight
        ref={cursorLightRef}
        position={[0.5, 0.8, 1.6]}
        intensity={2.2}
        color="#E2F1FF"
        distance={4.5}
      />

      {/* 3D Cyan Ground Contact Shadow & Underglow on footer line */}
      <mesh ref={shadowRef} position={[0, -0.96, -0.02]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0, 0.36, 32]} />
        <meshBasicMaterial
          color="#00E5FF"
          transparent
          opacity={0.42}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 3D Model Group loaded from portfolio-boy.glb */}
      <group ref={groupRef} position={[0, -0.05, 0]}>
        <primitive object={model} />
      </group>
    </>
  );
}

// Preload the GLB model for instant loading
useGLTF.preload('/models/portfolio-boy.glb');
