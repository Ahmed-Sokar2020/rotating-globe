import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import ThreeGlobe from 'three-globe'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import './globe.css'

import countries from '../data/custom.geo.json'
import lines from '../data/lines.json'
import map from '../data/map.json'

interface LinesData {
    type: string;
    pulls: {
        type: string;
        order: number;
        from: string;
        to: string;
        startLat: string;
        startLng: string;
        endLat: string;
        endLng: string;
        arcAlt: number;
    }[];
}

interface MapData {
    type: string;
    maps: {
        text: string;
        size: number;
        country: string;
        city: string;
        lat: string;
        lng: string;
    }[];
}

let mouseX=0;
let mouseY =0;
var myGlobe:any;
let scene:any;
let camera:any;
let renderer:any;
let controls:any;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

export default function Globe () {
    const globeRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const container = globeRef.current!;
        
        // Set up Three.js scene
        scene = new THREE.Scene();
        
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        var ambientLight = new THREE.AmbientLight(0xbbbbbb, .3);
        scene.add(ambientLight);

        const startGeometry = new THREE.SphereGeometry(5,64,64)
        const startTexture  = new THREE.TextureLoader().load('https://github.githubassets.com/images/modules/site/home-campaign/footer-galaxy.jpg');
        const startMaterial = new THREE.MeshBasicMaterial({
            map: startTexture,
            side:THREE.BackSide
        })

        const startMesh = new THREE.Mesh(startGeometry, startMaterial);
        scene.add(startMesh);
        
        // background color of the scene
        // scene.background = new THREE.Color(0x040d21);
        scene.background = new THREE.TextureLoader().load('https://github.githubassets.com/images/modules/site/home-campaign/footer-galaxy.jpg');
        
        camera = new THREE.PerspectiveCamera();
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();

        var dLight = new THREE.DirectionalLight(0xffffff,.8);
        dLight.position.set(800,2000,400);
        camera.add(dLight);

        var dLight1 = new THREE.DirectionalLight(0x798216,1);
        dLight.position.set(200,500,200);
        camera.add(dLight1);

        var dLight2 = new THREE.PointLight(0x8566cc,.5);
        dLight.position.set(200,500,200);
        camera.add(dLight2);

        // Set up initial camera position
        camera.position.z = 400;
        camera.position.x = 0;
        camera.position.y = 0;

        scene.add(camera);

        scene.fog = new THREE.Fog(0x535ef3, 400, 2000);

        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dynamicDampingFactor = .01;
        controls.enablePan = false;
        controls.minDistance = 200;
        controls.maxDistance = 500;
        controls.rotateSpeed = .8;
        controls.zoomSpeed = 1;
        controls.autoRotate = false;

        controls.minPolarAngle = Math.PI / 3.5;
        controls.maxPolarAngle = Math.PI - Math.PI / 3;

        window.addEventListener("resize", onWindowResize, false);
        window.addEventListener("mousemove", onMouseMove);
        
        initGlobe ()
        
        animate();
    });

    const onWindowResize = () =>{
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        windowHalfX = window.innerWidth / 1.5;
        windowHalfY = window.innerHeight / 1.5;
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function onMouseMove(event:any) {
        mouseX = event.clientX;
        mouseY = event.clientY;
        // mouseX = event.clientX - windowHalfX;
        // mouseY = event.clientY - windowHalfY;
    }

    function initGlobe () {
        myGlobe = new ThreeGlobe({
            waitForGlobeReady:true,
            animateIn:true
        })

        .hexPolygonsData(countries.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.7)
        .showAtmosphere(true)
        .atmosphereColor("#3a228a")
        .atmosphereAltitude(.25)

        setTimeout(() => {
            myGlobe.arcsData((lines as LinesData).pulls)
            .arcColor((e:any) => {
                return e.status ? "#9cff00" : "#ff4000";
            })
            .arcAltitude((e:any) => {
                return e.arcAlt;
            })
            .arcStroke((e:any) => {
                return e.status ? 0.5 : 0.3;
            })
            .arcDashLength(0.9)
            .arcDashGap(4)
            .arcDashAnimateTime(1000)
            .arcsTransitionDuration(1000)
            .arcDashInitialGap((e:any) => e.order*1)

            .labelsData((map as MapData).maps)
            .labelColor(() => "#ffcb21")
            .labelDotRadius(0.3)
            .labelSize((e:any) => e.size)
            .labelText("city")
            .labelResolution(6)
            .labelAltitude(0.01)
            .pointsData((map as MapData).maps)
            .pointColor(()=>"#ffffff")
            .pointsMerge(true)
            .pointAltitude(0.07)
            .pointRadius(0.05)
        },1000)
        

        myGlobe.rotateY(-Math.PI * (5/9));
        myGlobe.rotateZ(-Math.PI / 6);

        const globeMaterial = myGlobe.globeMaterial();
        globeMaterial.color = new THREE.Color(0x3a228a);
        globeMaterial.emissive = new THREE.Color(0x220038);
        globeMaterial.emissiveIntensity = .1;
        globeMaterial.shininess = .7;

        scene.add(myGlobe)
    }

    function animate () {
        camera.position.x += 
        Math.abs(mouseX) <= windowHalfX / 2 ? (mouseX / 2 - camera.position.x) * .005 : 0;
        camera.position.y += (-mouseY / 2 - camera.position.y) * .005;
        camera.lookAt(scene.position);
        controls.update();
        myGlobe.rotation.y += 0.002;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };

    // function showPopover(event:any) {
    //     const line = event.target;
        
    //     // Calculate the popover position (adjust this according to your needs)
    //     const popoverX = event.clientX;
    //     const popoverY = event.clientY;
        
    //     // Create the popover element
    //     const popover = document.createElement('div');
    //     popover.classList.add('popover');
        
    //     // Position the popover
    //     popover.style.left = `${popoverX}px`;
    //     popover.style.top = `${popoverY}px`;
        
    //     // Set popover content (adjust this according to your needs)
    //     popover.innerHTML = 'Popover content';
        
    //     // Append the popover to the document body
    //     document.body.appendChild(popover);
    // }
    
    // function hidePopover(event:any) {
    //     const popover = document.querySelector('.popover');
        
    //     // Remove the popover from the document body
    //     if (popover) {
    //     popover.remove();
    //     }
    // }


    return (
        <>
            <div className='globe' ref={globeRef}> </div>
        </>
    )
    
};



















