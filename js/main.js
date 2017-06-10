var camera, scene, renderer, controls;
var mtlLoader, objLoader;
var rings, sonic, clouds, sun;
var pontosReta = new THREE.Geometry();
var pontosSalto = new THREE.Geometry();
var count = 0;

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
	
	// carrega o exterior
	mtlLoader = new THREE.MTLLoader();
	mtlLoader.setPath('obj/exterior/');
	mtlLoader.load('Security_Gate.mtl', function(materials) {

		materials.preload();
		
		objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(materials);
		objLoader.setPath('obj/exterior/');
		objLoader.load('Security_Gate.obj', function (object) {
			var house = object;
			house.scale.set(70, 100, 70);
			house.rotateY(Math.PI/2);
			house.position.set(15, -35, -95);

			scene.add(object);
		});
	});
	
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
			scene.add(sonic);
			
			sonicMoves();
		});
	});
	
	// carrega os aneis
	mtlLoader = new THREE.MTLLoader();
	mtlLoader.setPath('obj/ring/');
	mtlLoader.load('ring.mtl', function(materials) {
		materials.preload();

		objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(materials);
		objLoader.setPath('obj/ring/');	

		for (var i = 0; i < 3; i++) {
			switch (i) {
				case 0:
					objLoader.load('ring.obj', function (object) {
						rings[0] = object;
						rings[0].scale.set(10, 10, 10);
						rings[0].rotateX(Math.PI/2);
						rings[0].position.set(35, -16, 0);
						scene.add(rings[0]);
					});	
					break;
				case 1:
					objLoader.load('ring.obj', function (object) {
						rings[1] = object;
						rings[1].scale.set(10, 10, 10);
						rings[1].rotateX(Math.PI/2);
						rings[1].position.set(50, -16, 0);
						scene.add(rings[1]);
					});
					break;
				case 2:
					objLoader.load('ring.obj', function (object) {
						rings[2] = object;
						rings[2].scale.set(10, 10, 10);
						rings[2].rotateX(Math.PI/2);
						rings[2].position.set(65, -16, 0);
						scene.add(rings[2]);
					});
					break;
			}
		}
	});
	
	// carrega as nuvens
	mtlLoader = new THREE.MTLLoader();
	mtlLoader.setPath('obj/cloud/');
	mtlLoader.load('island-cloud.mtl', function(materials) {

		materials.preload();

		objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(materials);
		objLoader.setPath('obj/cloud/');
		for (var i = 0; i < 2; i++) {
			switch(i) {
				case 0:
					objLoader.load('island-cloud.obj', function (object) {
						clouds[0] = object;
						clouds[0].scale.set(0.1, 0.1, 0.1);
						clouds[0].rotateX(Math.PI/2);
						clouds[0].position.set(50, 25, -20);
						scene.add(clouds[0]); 
					});
					break;
				case 1:
					objLoader.load('island-cloud.obj', function (object) {
						clouds[1] = object;
						clouds[1].scale.set(0.1, 0.1, 0.1);
						clouds[1].rotateX(Math.PI/2);
						clouds[1].position.set(-50, 25, -20);
						scene.add(clouds[1]);
					});
					break;
			}
		}
	});
	
	// carrega e aplica a texture do sol
	var textureLoader = new THREE.TextureLoader();
	
	uniforms = {

		fogDensity: { value: 0.0001 },
		fogColor:   { value: new THREE.Vector3(255, 203, 31) },
		time:       { value: 1.0 },
		uvScale:    { value: new THREE.Vector2(3.0, 1.0) },
		texture1:   { value: textureLoader.load("texture/lava/cloud.png") },
		texture2:   { value: textureLoader.load("texture/lava/lavatile.jpg") }

	};

	uniforms.texture1.value.wrapS = uniforms.texture1.value.wrapT = THREE.RepeatWrapping;
	uniforms.texture2.value.wrapS = uniforms.texture2.value.wrapT = THREE.RepeatWrapping;
	
	// carrega o shader do sol
	var sunMaterial = new THREE.ShaderMaterial( {
		uniforms: uniforms,
		vertexShader: document.getElementById('vertexShader').textContent,
		fragmentShader: document.getElementById('fragmentShader').textContent,
	});
	
	// cria o sol e aplica o shader
	sun = new THREE.Mesh( new THREE.SphereGeometry(4, 32, 32), sunMaterial );
	sun.rotation.x = 0;
	sun.position.set(0, 30, -50);
	scene.add(sun);

    window.addEventListener('resize', onWindowResize, false);
}

function sonicJump() {

	for (var i = 0; i <= 20; i++) {
		sonic.position.x = pontosSalto.vertices[i].x;
		sonic.position.y = pontosSalto.vertices[i].y;
		sonic.position.z = pontosSalto.vertices[i].z;
	}
		
}

function sonicFoward() {
	if(count == 20)
			return;

	sonic.position.x = pontosReta.vertices[count].x;
	sonic.position.y = pontosReta.vertices[count].y;
	sonic.position.z = pontosReta.vertices[count].z;

	count++;
}

function sonicMoves() {
	
	// anda um passo toda vez que a seta pra direita é pressionada
	$(document).keydown(function(e){

		if (e.which == 39) {
			criaCurva("reta");
			sonicFoward();
		}
	});
	
	// salta quando seta pra cima é pressionada
	$(document).keydown(function(e){

		if (e.which == 38) {
			criaCurva("salto");
			sonicJump();
		}
	});
}


function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {
	
	requestAnimationFrame(animate);
	
	// faz os aneis girarem
	for (var i = 0; i < rings.length; i++) {
		rings[i].rotation.z += 0.05;
	}
	
	// faz o sol girar
	sun.rotation.y += 0.01;
	
	controls.update();

	render();

}

function criaCurva(opc) {
	
	if(opc == "reta") {
		var reta = new THREE.QuadraticBezierCurve3(
			new THREE.Vector3(sonic.position.x, -35, 0),
			new THREE.Vector3(sonic.position.x/2, -35, 0),
			new THREE.Vector3(30, -35, 0)
		);
		
		pontosReta.vertices = reta.getPoints(20);
	}
	else {
		var salto = new THREE.QuadraticBezierCurve3(
			new THREE.Vector3(sonic.position.x, -35, 0),
			new THREE.Vector3(sonic.position.x, 0, 0),
			new THREE.Vector3(sonic.position.x, -35, 0)
		);
	
		pontosSalto.vertices = salto.getPoints(20);
	}
}

function render() {

	camera.lookAt(scene.position);
	renderer.render(scene, camera);

}
