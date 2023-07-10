import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Interaction } from '../models/InteractionAPI';
import './globe.css'


interface GlobeProps {
    interactions: Interaction[];
}

const Globe = ({ interactions }: GlobeProps) => {
    const globeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = globeRef.current!;

        // Set up Three.js scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        // Create a sphere geometry for the globe
        const radius = 5;
        const widthSegments = 64;
        const heightSegments = 64;
        const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

        // Create a basic material and texture for the globe
        const textureLoader = new THREE.TextureLoader();
        // const texture = textureLoader.load('/assets/images/globe.jpg');
        const texture = textureLoader.load('https://github.githubassets.com/images/modules/site/home/globe-700.jpg');
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const globe = new THREE.Mesh(geometry, material);
        scene.add(globe);

        // Add interactive markers
        interactions.forEach(interaction => {
        const markerGeometry = new THREE.SphereGeometry(0.05);
        const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const marker = new THREE.Mesh(markerGeometry, markerMaterial);
        const { latitude, longitude } = interaction.coordinates;
        const phi = (90 - latitude) * (Math.PI / 180);
        const theta = (180 - longitude) * (Math.PI / 180);
        marker.position.setFromSphericalCoords(radius + 0.2, phi, theta);
        scene.add(marker);
        });

        // Set up initial camera position
        camera.position.z = 15;

        // Create and animate the globe
        const animate = () => {
        requestAnimationFrame(animate);
        globe.rotation.y += 0.01;
        renderer.render(scene, camera);
        };
        animate();
    }, [interactions]);


    return (
        <>
            <div className='globe' ref={globeRef}> 
                <div className='globe-img'>
                    <img src="https://github.githubassets.com/images/modules/site/home-campaign/astrocat.png" alt="Mona looking at the galaxy"/>
                </div>
            </div>

        </>
    )
    
};

export default Globe;
















