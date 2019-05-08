let texture, geometry, material, loader, renderer, scene, camera, controls, delta, clock;


const tilt = Math.PI / 8;
const Planets = {
    sun: {},
    mercury: {},
    venus: {},
    earth: {},
    mars: {},
    jupiter: {},
    saturn: {},
    uranus: {},
    neptune: {},
    moon: {},
    ganymede: {}
};
const Dimensions = {
    sun: 70,
    mercury: 2.1234,
    venus: 3.3,
    earth: 4,
    mars: 3.4345,
    jupiter: 13.656,
    saturn: 10.642,
    uranus: 9,
    neptune: 8.2342,
    moon: 1.54234,
    ganymede: 2.645
}
const Transformations = {
    sun: {
        traslX: 0,
        rot: 0.0001
    },
    mercury: {
        traslX: 100,
        rot: -0.000253
    },
    venus: {
        traslX: 150,
        rot: 0.000232
    },
    earth: {
        traslX: 210,
        rot: 0.0001123
    },
    mars: {
        traslX: 250,
        rot: -0.00020218
    },
    jupiter: {
        traslX: 330,
        rot: -0.0001354
    },
    saturn: {
        traslX: 400,
        rot: 0.000124234
    },
    uranus: {
        traslX: 460,
        rot: -0.0002053
    },
    neptune: {
        traslX: 530,
        rot: 0.00012644
    },
    moon: {
        traslX: 10,
        rot: -0.00132423
    },
    ganymede: {
        traslX: 15,
        rot: 0.001
    },

}

function init() {

    loader = new THREE.TextureLoader();
    loader.crossOrigin = "";
    renderer = new THREE.WebGLRenderer();

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000000);
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = true;
    controls.enableDamping = true;
    controls.minPolarAngle = 0.8;
    controls.maxPolarAngle = 2.4;
    controls.dampingFactor = 0.1;
    controls.rotateSpeed = 0.07;

    camera.rotation.order = 'YXZ';
    camera.position.set(0, 0, 500);

    renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.body.appendChild(renderer.domElement);

    createPlanet('sun');

    createPlanet('mercury');

    createPlanet('venus');

    createPlanet('earth');
    createPlanet('moon');

    createPlanet('mars');

    createPlanet('jupiter');
    createPlanet('ganymede');

    createPlanet('saturn');

    createPlanet('uranus');

    createPlanet('neptune');

    const sunLight = new THREE.PointLight(0xffffff, 1.2, 1000000, 2);
    sunLight.add(Planets.sun);
    scene.add(sunLight);
}


function createPlanet(planet) {
    texture = loader.load(`textures/${planet}.jpg`);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    if (planet === 'sun') {
        material = new THREE.MeshLambertMaterial({
            map: texture,
            lightMap: texture
        });
    } else {
        material = new THREE.MeshLambertMaterial({
            map: texture
        });
    }


    geometry = new THREE.SphereGeometry(Dimensions[planet], 32, 32);


    Planets[planet] = new THREE.Mesh(geometry, material);
    Planets[planet].matrixAutoUpdate = false;

    if (planet === 'sun')
        return;

    if (planet === 'moon')
        Planets.earth.add(Planets[planet]);
    else if (planet === 'ganymede')
        Planets.jupiter.add(Planets[planet]);
    else
        Planets.sun.add(Planets[planet]);

}

function makeTransformation() {

    for (let planet of Object.keys(Planets)) {

        if (planet === 'sun') {
            Planets.sun.matrix = new THREE.Matrix4().makeRotationY(Transformations[planet].rot);
            continue;
        }

        let traslation = new THREE.Matrix4().makeTranslation(Transformations[planet].traslX, 0, 0);
        let rotation = new THREE.Matrix4().makeRotationY(Transformations[planet].rot * renderer.time);
        Planets[planet].matrix = rotation.multiply(traslation);

    }
}

function animate() {
    render();
    requestAnimationFrame(animate);

}

function render() {

    let now = new Date();
    renderer.time = now;

    makeTransformation();

    controls.update();

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.onload = () => {
    init();

    animate();

    window.addEventListener();
}