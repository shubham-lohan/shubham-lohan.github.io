// Three.js Background Animation
const canvas = document.querySelector('#bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 700;

const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    // Spread particles across a wide area
    posArray[i] = (Math.random() - 0.5) * 15; 
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Material
const material = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x00f3ff, // Cyan
    transparent: true,
    opacity: 0.8,
});

// Mesh
const particlesMesh = new THREE.Points(particlesGeometry, material);
scene.add(particlesMesh);

// Connecting Lines (Optional - can be heavy, using simple particles for performance first)
// We can add lines if needed, but let's stick to a "Data Cloud" look for now.

// Mouse Interaction
document.addEventListener('mousemove', animateParticles);

let mouseX = 0;
let mouseY = 0;

function animateParticles(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
}

// Animation Loop
const clock = new THREE.Clock();

function tick() {
    const elapsedTime = clock.getElapsedTime();

    // Rotate entire system slowly
    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.rotation.x = elapsedTime * 0.02;

    // Mouse interaction (gentle parallax)
    // particlesMesh.rotation.y += mouseX * 0.0001;
    // particlesMesh.rotation.x += mouseY * 0.0001;

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
}

tick();

// Resize Handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
