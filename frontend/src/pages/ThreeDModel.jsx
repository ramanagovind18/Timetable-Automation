import React, { useEffect } from "react";
import * as THREE from "three";

const ThreeDModel = () => {
  useEffect(() => {
    // Create a scene
    const scene = new THREE.Scene();
    
    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create a renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth / 3, window.innerHeight);
    document.getElementById("3d-model").appendChild(renderer.domElement);

    // Create a box geometry for the room
    const roomGeometry = new THREE.BoxGeometry(2, 2, 2);
    const roomMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
    const room = new THREE.Mesh(roomGeometry, roomMaterial);
    scene.add(room);

    // Create a light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      room.rotation.x += 0.01;
      room.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => {
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div id="3d-model" style={{ width: "33.33%", height: "100vh" }}></div>
  );
};

export default ThreeDModel;
