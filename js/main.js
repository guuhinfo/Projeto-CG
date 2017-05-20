var camera, scene, renderer;

init();

function init() {

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.x = 0;
	camera.position.y = 0;
    camera.position.z = 0;

    scene = new THREE.Scene();

	// carrega o modelo
	var loader = new THREE.OBJLoader();
	loader.load('obj/Dice.obj', function (object) {
		scene.add(object);

	});

}

function render() {

}
