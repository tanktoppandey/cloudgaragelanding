import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export function ThreeJsMesh() {
  const mountRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const groupRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.setSize(500, 500);
    mountRef.current.appendChild(renderer.domElement);
    
    const cloudGroup = new THREE.Group();
    groupRef.current = cloudGroup;
    
    // Enhanced Materials
    const mainMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x4a90e2,
      metalness: 0.2,
      roughness: 0.1,
      transmission: 0.1,
      thickness: 0.5,
      envMapIntensity: 1.5,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2
    });

    const crystalMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x4a90e2,
      metalness: 0.9,
      roughness: 0.1,
      transmission: 0.5,
      thickness: 0.5,
      envMapIntensity: 2
    });

    // Complex geometry creation
    const createComplexGeometry = () => {
      const geometry = new THREE.OctahedronGeometry(1.2, 0);
      const positions = geometry.attributes.position;
      const vertices = [];
      
      for (let i = 0; i < positions.count; i++) {
        const vertex = new THREE.Vector3();
        vertex.fromBufferAttribute(positions, i);
        
        const distanceFromCenter = vertex.length();
        const displacement = (Math.random() - 0.5) * 0.2;
        vertex.multiplyScalar(1 + displacement);
        
        vertices.push(vertex);
      }
      
      return new THREE.BufferGeometry().setFromPoints(vertices);
    };

    // Main mesh with complex geometry
    const mainGeometry = createComplexGeometry();
    const mainMesh = new THREE.Mesh(mainGeometry, mainMaterial);
    cloudGroup.add(mainMesh);

    // Sharp crystal structures
    const crystalGeometry = new THREE.TetrahedronGeometry(0.4, 0);
    const crystalPositions = [
      { pos: [1.2, 0, 0], rot: [0.5, 0.5, 0] },
      { pos: [-1.2, 0, 0], rot: [-0.5, -0.5, 0] },
      { pos: [0, 1.2, 0], rot: [0, 0.5, 0.5] },
      { pos: [0, -1.2, 0], rot: [0, -0.5, -0.5] }
    ];

    crystalPositions.forEach(({ pos, rot }) => {
      const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
      crystal.position.set(...pos);
      crystal.rotation.set(...rot);
      cloudGroup.add(crystal);
    });

    // Dynamic wireframe
    const wireframeGeometry = new THREE.OctahedronGeometry(1.8, 1);
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0x6fa8dc,
      transparent: true,
      opacity: 0.2
    });
    const wireframe = new THREE.LineSegments(
      new THREE.WireframeGeometry(wireframeGeometry),
      wireframeMaterial
    );
    cloudGroup.add(wireframe);

    // Energy lines
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x89cff0,
      transparent: true,
      opacity: 0.4
    });

    for (let i = 0; i < 8; i++) {
      const lineGeometry = new THREE.BufferGeometry();
      const points = [];
      const radius = 2;
      const height = 3;
      const segments = 50;

      for (let j = 0; j < segments; j++) {
        const t = j / segments;
        const angle = t * Math.PI * 2 * 2 + (i * Math.PI / 4);
        const x = Math.cos(angle) * radius * (1 - t);
        const y = (t - 0.5) * height;
        const z = Math.sin(angle) * radius * (1 - t);
        points.push(new THREE.Vector3(x, y, z));
      }

      lineGeometry.setFromPoints(points);
      const line = new THREE.Line(lineGeometry, linesMaterial);
      cloudGroup.add(line);
    }

    scene.add(cloudGroup);
    
    // Enhanced lighting setup
    const lights = [
      { type: 'ambient', color: 0xffffff, intensity: 0.6 },
      { type: 'directional', color: 0xffffff, intensity: 1, position: [5, 5, 5] },
      { type: 'directional', color: 0x4a90e2, intensity: 0.5, position: [-5, -5, -5] },
      { type: 'point', color: 0x357abd, intensity: 0.5, position: [3, 3, 3] },
      { type: 'point', color: 0x6fa8dc, intensity: 0.5, position: [-3, -3, -3] }
    ];

    lights.forEach(light => {
      let lightObject;
      switch (light.type) {
        case 'ambient':
          lightObject = new THREE.AmbientLight(light.color, light.intensity);
          break;
        case 'directional':
          lightObject = new THREE.DirectionalLight(light.color, light.intensity);
          lightObject.position.set(...light.position);
          break;
        case 'point':
          lightObject = new THREE.PointLight(light.color, light.intensity);
          lightObject.position.set(...light.position);
          break;
      }
      scene.add(lightObject);
    });
    
    camera.position.z = 6;
    
    // Optimized animation with smooth transitions
    let rotationSpeed = 0.002;
    let currentRotation = { x: 0, y: 0 };
    
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      // Smooth base rotation
      currentRotation.y += rotationSpeed;
      cloudGroup.rotation.y = currentRotation.y;
      wireframe.rotation.y -= rotationSpeed * 0.5;
      
      // Hover effects
      if (isHovered) {
        rotationSpeed = 0.003;
        wireframeMaterial.opacity = 0.3 + Math.sin(Date.now() * 0.001) * 0.1;
        linesMaterial.opacity = 0.5 + Math.sin(Date.now() * 0.001) * 0.1;
      } else {
        rotationSpeed = 0.002;
        wireframeMaterial.opacity = 0.2;
        linesMaterial.opacity = 0.4;
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    const handleResize = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      [mainGeometry, crystalGeometry, wireframeGeometry].forEach(
        geometry => geometry.dispose()
      );
      [mainMaterial, crystalMaterial, wireframeMaterial, linesMaterial].forEach(
        material => material.dispose()
      );
    };
  }, []);

  return (
    <div 
      ref={mountRef}
      className="w-full h-full min-h-[600px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
}