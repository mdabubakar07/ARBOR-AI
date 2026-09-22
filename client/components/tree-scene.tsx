'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import { Suspense, useMemo, useRef } from 'react'
import * as THREE from 'three'

/**
 * Procedural stylized tree: a tapered trunk with recursively branched limbs,
 * each tipped with a soft emissive "data node". Not a game asset — a calm,
 * scientific botanical visualization.
 */

type Branch = {
  start: THREE.Vector3
  end: THREE.Vector3
  radius: number
  depth: number
}

function buildTree(): { branches: Branch[]; nodes: THREE.Vector3[] } {
  const branches: Branch[] = []
  const nodes: THREE.Vector3[] = []
  const rng = mulberry32(7)

  function grow(
    start: THREE.Vector3,
    dir: THREE.Vector3,
    length: number,
    radius: number,
    depth: number,
  ) {
    const end = start.clone().add(dir.clone().multiplyScalar(length))
    branches.push({ start, end, radius, depth })

    if (depth >= 4 || length < 0.28) {
      nodes.push(end)
      return
    }

    const children = depth === 0 ? 3 : 2
    for (let i = 0; i < children; i++) {
      const spread = 0.5 + rng() * 0.55
      const axis = new THREE.Vector3(rng() - 0.5, rng() * 0.3, rng() - 0.5).normalize()
      const newDir = dir
        .clone()
        .applyAxisAngle(axis, spread)
        .normalize()
      // bias upward so the tree reaches
      newDir.y += 0.35
      newDir.normalize()
      grow(end, newDir, length * (0.7 + rng() * 0.1), radius * 0.66, depth + 1)
    }
  }

  grow(new THREE.Vector3(0, -2.4, 0), new THREE.Vector3(0, 1, 0), 1.7, 0.16, 0)
  return { branches, nodes }
}

function mulberry32(seed: number) {
  let a = seed
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function TreeMesh() {
  const group = useRef<THREE.Group>(null)
  const { branches, nodes } = useMemo(() => buildTree(), [])
  const pointer = useThree((s) => s.pointer)

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    // gentle sway
    group.current.rotation.z = Math.sin(t * 0.4) * 0.03
    // subtle mouse parallax
    const targetY = pointer.x * 0.5
    const targetX = -pointer.y * 0.25
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.04
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.04
  })

  return (
    <group ref={group}>
      {branches.map((b, i) => (
        <BranchCylinder key={i} branch={b} />
      ))}
      {nodes.map((n, i) => (
        <mesh key={`n-${i}`} position={n}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? '#5de1e6' : '#74e39a'}
            emissive={i % 3 === 0 ? '#5de1e6' : '#19c37d'}
            emissiveIntensity={2.2}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  )
}

function BranchCylinder({ branch }: { branch: Branch }) {
  const { position, quaternion, height } = useMemo(() => {
    const dir = branch.end.clone().sub(branch.start)
    const height = dir.length()
    const mid = branch.start.clone().add(branch.end).multiplyScalar(0.5)
    const quat = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir.clone().normalize(),
    )
    return { position: mid, quaternion: quat, height }
  }, [branch])

  return (
    <mesh position={position} quaternion={quaternion}>
      <cylinderGeometry args={[branch.radius * 0.7, branch.radius, height, 8]} />
      <meshStandardMaterial
        color="#12281d"
        roughness={0.85}
        metalness={0.1}
        emissive="#0d3a26"
        emissiveIntensity={0.35}
      />
    </mesh>
  )
}

function Pollen({ count = 90 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    const rng = mulberry32(21)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rng() - 0.5) * 9
      arr[i * 3 + 1] = (rng() - 0.5) * 8
      arr[i * 3 + 2] = (rng() - 0.5) * 6
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.y = t * 0.03
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < count; i++) {
      const y = pos.getY(i) + Math.sin(t * 0.4 + i) * 0.0025 + 0.004
      pos.setY(i, y > 4 ? -4 : y)
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#74e39a"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  )
}

export default function TreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 7], fov: 42 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.35} />
        <spotLight
          position={[6, 8, 6]}
          angle={0.4}
          penumbra={1}
          intensity={35}
          color="#a8ffd4"
        />
        <pointLight position={[-5, -2, 3]} intensity={18} color="#5de1e6" />
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
          <TreeMesh />
        </Float>
        <Pollen />
        <Environment preset="forest" environmentIntensity={0.3} />
        <fog attach="fog" args={['#06110d', 8, 16]} />
      </Suspense>
    </Canvas>
  )
}
