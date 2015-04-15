/**
 * The Setup
 */

var scene,
    camera,
    light,
    renderer,
    earthObject;

var rotationSpeed = 0.02,
    clock = new THREE.Clock();

var WIDTH = window.innerWidth - 30,
    HEIGHT = window.innerHeight - 30;

var angle = 45,
    aspect = WIDTH / HEIGHT,
    near = 0.1,
    far = 3000;



/**
 * The Environment
 */

var container = document.getElementById('content');

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(angle, aspect, near, far);
camera.position.set(0, 0, 0);

light = new THREE.SpotLight(0xFFFFFF, 1, 0, Math.PI / 2, 1);
light.position.set(4000, 4000, 1500);
light.target.position.set (1000, 3800, 1000);

scene.add(light);



/**
 * The Earth
 */

var earthGeo = new THREE.SphereGeometry (30, 40, 400),
    earthMat = new THREE.MeshPhongMaterial();

// diffuse map
earthMat.map = THREE.ImageUtils.loadTexture('images/earth-diffuse-map.jpg');

// bump map
earthMat.bumpMap = THREE.ImageUtils.loadTexture('images/earth-bump-map.jpg');
// earthMat.bumpScale = 8;

var earthMesh = new THREE.Mesh(earthGeo, earthMat);
earthMesh.position.set(-100, 0, 0);
earthMesh.rotation.y = 5;

scene.add(earthMesh);

camera.lookAt( earthMesh.position );



/**
 * Stars
 */

var starGeo = new THREE.SphereGeometry (3000, 10, 100),
    starMat = new THREE.MeshBasicMaterial();
starMat.map = THREE.ImageUtils.loadTexture('https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/star-field.png');
starMat.side = THREE.BackSide;

var starMesh = new THREE.Mesh(starGeo, starMat);

scene.add(starMesh);



/**
 * The Rendering
 */

var renderer = new THREE.WebGLRenderer({antialiasing : true});
renderer.setSize(WIDTH, HEIGHT);
renderer.domElement.style.position = 'relative';

container.appendChild(renderer.domElement);
renderer.autoClear = false;
renderer.shadowMapEnabled = true;

function animate() {
   requestAnimationFrame(animate);
   render();
}

function render() {

   var delta = clock.getDelta();

   earthMesh.rotation.y += 0.02;

   renderer.render(scene, camera);
}

animate();
