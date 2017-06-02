var camera, scene, renderer, controls;
var mtlLoader, objLoader;
var rings, sonic, clouds, sun;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(8, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.x = 0;
	camera.position.y = 100;
    camera.position.z = 500;
	
    scene = new THREE.Scene();
	rings = new Array();
	clouds = new Array();

	renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

	// adiciona luz ambiente
	var ambientLight = new THREE.AmbientLight(0x404040, 4.8);
	scene.add(ambientLight);

	// faz a camera mexer
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.addEventListener('change', render);

	// so permite mexer a camera horizontalmente
	controls.minPolarAngle = Math.PI/2;
	controls.maxPolarAngle = 0;
	controls.minAzimuthAngle = - Infinity;
	controls.maxAzimuthAngle = Infinity;

	// carrega o sonic
	mtlLoader = new THREE.MTLLoader();
	mtlLoader.setPath('obj/sonic/');
	mtlLoader.load('Sonic.mtl', function(materials) {

		materials.preload();

		objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(materials);
		objLoader.setPath('obj/sonic/');
		objLoader.load('Sonic.obj', function (object) {
			sonic = object;
        	sonic.scale.set( 1, 1, 1 );
        	sonic.rotateY(Math.PI/1.6);
        	sonic.position.set(-50, -35, 0);

			scene.add(object);
		});
	});

    window.addEventListener('resize', onWindowResize, false);
}


function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

	requestAnimationFrame(animate);

	controls.update();

	render();

}

function render() {

	camera.lookAt(scene.position);
	renderer.render(scene, camera);

}
