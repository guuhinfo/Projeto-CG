if (! Detector.webgl) Detector.addGetWebGLMessage();

var camera, scene, renderer, controls, clock, mixer;
var mtlLoader, objLoader;
var rings, sonic, clouds, sun;
var pontosReta = new THREE.Geometry();
var pontosSalto = new THREE.Geometry();
var count = 0, j = 0, jump = 0;
var stats;

$(document).ready(function(){
	init();
	animate();
});

function init() {
    
    camera = new THREE.PerspectiveCamera(8, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.x = 0;
	camera.position.y = 100;
    camera.position.z = 500;
	
	clock = new THREE.Clock();
    scene = new THREE.Scene();
	rings = new Array();
	clouds = new Array();
	
	renderer = new THREE.WebGLRenderer({ antialias:true });
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
	
	loadExterior();
	loadSonic();
	loadAneis();
	loadNuvens();
	loadPassaro();
	criaSol();

	// painel status webgl
	stats = new Stats();
	stats.showPanel(0);
	document.body.appendChild(stats.dom);

    window.addEventListener('resize', onWindowResize, false);
}

function sonicJump() {

	sonic.position.x = pontosSalto.vertices[j].x;
	sonic.position.y = pontosSalto.vertices[j].y;
	sonic.position.z = pontosSalto.vertices[j].z;
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
			jump = 1;
			j = 0;
			criaCurva("salto");

		}
	});
}


function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {
	stats.begin();

	// faz o sonic pular
	if (jump == 1 && j <= 20) {
		sonicJump();
		j++;
	}
	
	// faz os aneis girarem
	for (var i = 0; i < rings.length; i++) {
		rings[i].rotation.z += 0.05;
	}
	
	// faz o sol girar
	sun.rotation.y += 0.01;
	
	controls.update();

	stats.end();

	render();
	requestAnimationFrame(animate);

}

function criaCurva(opc) {
	
	// cria curva para o sonic andar para frente
	if(opc == "reta") {
		var reta = new THREE.QuadraticBezierCurve3(
			new THREE.Vector3(sonic.position.x, -35, 0),
			new THREE.Vector3(sonic.position.x/2, -35, 0),
			new THREE.Vector3(30, -35, 0)
		);
		
		pontosReta.vertices = reta.getPoints(20);
	}
	// cria curva para o sonic pular
	else if (opc == "salto") {
		var salto = new THREE.QuadraticBezierCurve3(
			new THREE.Vector3(sonic.position.x, -35, 0),
			new THREE.Vector3(sonic.position.x, 0, 0),
			new THREE.Vector3(sonic.position.x, -35, 0)
		);
	
		pontosSalto.vertices = salto.getPoints(20);
	}

}

function render() {
	
	mixer.update( clock.getDelta() );
	camera.lookAt(scene.position);
	renderer.render(scene, camera);

}

function criaSol() {
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
}

function loadExterior() {
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
}

function loadAneis() {
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
}

function loadNuvens() {
	// carrega textura das nuvens
	var texture = new THREE.TextureLoader().load( "../texture/cloud.jpg" );

	// carrega primeira nuvem
	objLoader = new THREE.OBJLoader();
    objLoader.load( 'obj/cloud/island-cloud.obj', function ( object ) {

		clouds[0] = object;
		clouds[0].scale.set(0.1, 0.1, 0.1);
		clouds[0].rotateX(Math.PI/2);
		clouds[0].position.set(50, 25, -20);

		clouds[0].traverse( function (child) {

			if (child instanceof THREE.Mesh)
				child.material.map = texture;
		} );

		scene.add(clouds[0]);
	});

	// carrega segunda nuvem
	objLoader = new THREE.OBJLoader();
    objLoader.load( 'obj/cloud/island-cloud.obj', function ( object ) {

		clouds[1] = object;
		clouds[1].scale.set(0.1, 0.1, 0.1);
		clouds[1].rotateX(Math.PI/2);
		clouds[1].position.set(-50, 25, -20);

		clouds[1].traverse( function (child) {

			if (child instanceof THREE.Mesh)
				child.material.map = texture;
		} );

		scene.add(clouds[1]);
	});
}

function loadPassaro() {
	mixer = new THREE.AnimationMixer(scene);
	
	var loader = new THREE.JSONLoader();
	loader.load( 'obj/stork.js', function ( geometry, materials ) {
		var material = materials[ 0 ];
		material.morphTargets = true;
		material.color.setHex(0x000000);

		mesh = new THREE.Mesh(geometry, materials);

		mesh.position.set(0, 17, 0);

		mesh.scale.set(0.1, 0.1, 0.1);

		mesh.rotateY(Math.PI/2);

		mesh.matrixAutoUpdate = false;
		mesh.updateMatrix();

		scene.add(mesh);

		mixer.clipAction(geometry.animations[0], mesh)
				.setDuration(1)
				.startAt( - Math.random() )
				.play();
	} );
}

function loadSonic() {
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
}