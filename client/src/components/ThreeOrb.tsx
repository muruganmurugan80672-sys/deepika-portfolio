import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeOrb: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) return;

    const width = mountNode.clientWidth || 400;
    const height = mountNode.clientHeight || 400;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountNode.appendChild(renderer.domElement);

    // Group to hold orb geometry and particles
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Core Icosahedron Sphere Geometry (Lavender)
    const geometry = new THREE.IcosahedronGeometry(1.4, 2);
    const material = new THREE.MeshPhongMaterial({
      color: 0xA78BFA,
      emissive: 0x33224E,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const mainMesh = new THREE.Mesh(geometry, material);
    mainGroup.add(mainMesh);

    // Inner Glowing Core (Pink)
    const innerGeo = new THREE.IcosahedronGeometry(0.9, 1);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xE879F9,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: false,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerMesh);

    // Floating Ring
    const ringGeo = new THREE.TorusGeometry(1.9, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xE879F9, transparent: true, opacity: 0.6 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    mainGroup.add(ringMesh);

    // Surrounding Particle Stars
    const particlesCount = 80;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 6;
      positions[i + 1] = (Math.random() - 0.5) * 6;
      positions[i + 2] = (Math.random() - 0.5) * 6;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0xF5F3FF,
      transparent: true,
      opacity: 0.7,
    });
    const particlePoints = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlePoints);

    // Ambient & Point Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xA78BFA, 2.5);
    pointLight1.position.set(3, 3, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xE879F9, 2);
    pointLight2.position.set(-3, -3, 2);
    scene.add(pointLight2);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (event.clientX / innerWidth - 0.5) * 0.8;
      mouseY = (event.clientY / innerHeight - 0.5) * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous subtle rotations
      mainMesh.rotation.y = elapsedTime * 0.3;
      mainMesh.rotation.x = elapsedTime * 0.15;

      innerMesh.rotation.y = -elapsedTime * 0.4;
      ringMesh.rotation.z = elapsedTime * 0.2;

      particlePoints.rotation.y = elapsedTime * 0.05;

      // Float effect
      mainGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.12;

      // Smooth mouse reaction
      mainGroup.rotation.y += (mouseX - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (mouseY - mainGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!mountNode) return;
      const newWidth = mountNode.clientWidth;
      const newHeight = mountNode.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mountNode && renderer.domElement) {
        mountNode.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '420px',
        position: 'relative',
        cursor: 'grab',
      }}
    />
  );
};
