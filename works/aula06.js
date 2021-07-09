// Exercício do cata-vento
import * as THREE from  '../build/three.module.js';
import Stats from       '../build/jsm/libs/stats.module.js';
import {GUI} from       '../build/jsm/libs/dat.gui.module.js';
import {TrackballControls} from '../build/jsm/controls/TrackballControls.js';
import {initRenderer, 
        initCamera, 
        degreesToRadians, 
        onWindowResize,
        initDefaultBasicLight} from "../libs/util/util.js";
import * as TWEEN from "../libs/other/tween.js/dist/tween.esm.js";
// import * as ThreeBSP from '../libs/other/ThreeBSP.js';
import CSG  from "./three-csg.js"
////////// Coisas da cena, como renderização, camera/////////////////////

var stats = new Stats();          // To show FPS information
var scene = new THREE.Scene();    // Create main scene
var renderer = initRenderer();    // View function in util/utils
var camera = initCamera(new THREE.Vector3(0, 45, 8)); // Init camera in this position
// var cameraSimula = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 500);
// cameraSimula.lookAt(0, 0.0, 0.0);
// cameraSimula.position.set(0.0, 0.0, 5.0);
camera.up.set(0, -1, 0); // That's the default value
// scene.add(cameraSimula);


var trackballControls = new TrackballControls( camera, renderer.domElement );
initDefaultBasicLight(scene);

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );


///////////Mostrar axis////////////////
// Show world axes
var axesHelper = new THREE.AxesHelper( 100 );
scene.add( axesHelper );

///////////Geometria do Plano///////////

var planeGeometry = new THREE.PlaneGeometry(500, 500);
planeGeometry.translate(0.0, 0.0, 0.0); // To avoid conflict with the axeshelper
var planeMaterial = new THREE.MeshBasicMaterial({
    color:"rgb(150, 150, 150)",
    //  "rgb(150, 150, 150)"
    side: THREE.DoubleSide
});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
// add the plane to the scene
scene.add(plane);

//////////////Geometria//////////////////
// Object Material
var objectMaterial = new THREE.MeshPhongMaterial({color:"red"});// wireframe: true
  objectMaterial.side =  THREE.DoubleSide;
///////Base do catavento
var extrudeSettings =
{
  depth: 4.0,
  bevelEnabled: true,
  bevelThickness:0.12,
  bevelSize:0.13,
  bevelSegments: 3
};

var extrudeGeometry = new THREE.ExtrudeGeometry(baseShape(), extrudeSettings);
var base_catavento = new THREE.Mesh(extrudeGeometry);
base_catavento.rotateX(degreesToRadians(90));
base_catavento.updateMatrix();

//criando cilindro
var cilindro_geometry = new THREE.CylinderGeometry(1.0,1.0,3.0,40,1);
var cilindro = new THREE.Mesh(cilindro_geometry);
cilindro.position.set(2.0,0.0,0.0);
cilindro.rotateX(degreesToRadians(90));
cilindro.updateMatrix();

//Segundo cilindro
var cilindro2= new THREE.Mesh(cilindro_geometry);
cilindro2.position.set(0.0,-2.0,0.0);
cilindro2.rotateX(degreesToRadians(90))
cilindro2.updateMatrix();

//Terceiro cilindro
var cilindro3= new THREE.Mesh(cilindro_geometry);
cilindro3.position.set(4.0,-2.0,0.0);
cilindro3.rotateX(degreesToRadians(90))
cilindro3.updateMatrix();

//Quarto cilindro
var cilindro4= new THREE.Mesh(cilindro_geometry);
cilindro4.position.set(2.0,-4.0,0.0);
cilindro4.rotateX(degreesToRadians(90))
cilindro4.updateMatrix();

//furos
//furo1
var furo1 = cilindro.clone();
furo1.scale.set(0.1,0.3,0.1);
furo1.position.set(0.5,-0.5,0.2);
furo1.updateMatrix();
//furo2
var furo2 = furo1.clone();
furo2.position.set(0.5,-3.5,0.2);
furo2.updateMatrix();
//furo3
var furo3 = furo1.clone();
furo3.position.set(3.5,-0.5,0.2);
furo3.updateMatrix();
//furo4
var furo4 = furo1.clone();
furo4.position.set(3.5,-3.5,0.2);
furo4.updateMatrix();

/////Esfera furada no centro
var posicaoX = 2.0;
var posicaoY=-2.0;
var raioEsfera = 1.5;
var esfera_geometry = new THREE.SphereGeometry(raioEsfera,40,40);
var esferaCentro = new THREE.Mesh(esfera_geometry);
esferaCentro.position.set(posicaoX,posicaoY,0.0);
esferaCentro.rotateX(degreesToRadians(90));
esferaCentro.scale.set(1,0.6,1)
esferaCentro.updateMatrix();

//esfera menor 
var geometry_esfera_menor = new THREE.SphereGeometry(raioEsfera/2.0,40,40);
var esferaMenor = new THREE.Mesh(geometry_esfera_menor);
esferaMenor.position.set(posicaoX,posicaoY,raioEsfera/2.0);
esferaMenor.updateMatrix();
//um quadrado pra cortar a esfera no meio
var quadrado = new THREE.BoxGeometry(raioEsfera*2,raioEsfera*2,raioEsfera*2,40,40);
var quadrado_esfera = new THREE.Mesh(quadrado, objectMaterial);
quadrado_esfera.position.set(posicaoX,posicaoY,-raioEsfera );
quadrado_esfera.updateMatrix();

// scene.add(base_catavento);
// scene.add(cilindro);
// scene.add(cilindro2);
// scene.add(cilindro3);
// scene.add(cilindro4);
// scene.add(esferaCentro);
// scene.add(quadrado_esfera);
// scene.add(furo1);


//criando a base com furos
var basemesh = CSG.fromMesh(base_catavento);
var esferaMesh = CSG.fromMesh(cilindro);
var esfera2Mesh = CSG.fromMesh(cilindro2);
var esfera3Mesh = CSG.fromMesh(cilindro3);
var esfera4Mesh = CSG.fromMesh(cilindro4);
var esferaCentroMesh = CSG.fromMesh(esferaCentro);
var esferaMenorMesh = CSG.fromMesh(esferaMenor);
var quadradoMesh = CSG.fromMesh(quadrado_esfera);
var furo1Mesh = CSG.fromMesh(furo1);
var furo2Mesh = CSG.fromMesh(furo2);
var furo3Mesh = CSG.fromMesh(furo3);
var furo4Mesh = CSG.fromMesh(furo4);

//cortando a esfera quadrado
var esferaCortada = esferaCentroMesh.subtract(quadradoMesh);

//furando a esfera central
var esferaFurada = esferaCortada.subtract(esferaMenorMesh);

//juntando a esfera e a base
var base_esfera = basemesh.union(esferaFurada);

//furo1 parafuso
var parafuso1 = base_esfera.subtract(furo1Mesh);
//furo2 parafuso
var parafuso2 = parafuso1.subtract(furo2Mesh);
//furo3 parafuso
var parafuso3 = parafuso2.subtract(furo3Mesh);
//furo2 parafuso
var parafuso4 = parafuso3.subtract(furo4Mesh);


//base com um furo
var baseFurada = parafuso4.subtract(esferaMesh);

//base furada com dois furos
var baseFurada2 = baseFurada.subtract(esfera2Mesh );

//base furada com 3 furos
var baseFurada3 = baseFurada2.subtract(esfera3Mesh);

//base furada com 4 furos
var baseFurada4 = baseFurada3.subtract(esfera4Mesh);

// transformando em mesh
var meshBaseFinal = CSG.toMesh(baseFurada4,base_catavento.matrix, objectMaterial);

scene.add(meshBaseFinal);
meshBaseFinal.position.set(-2.0,2.0,0.0);


function baseShape()
{
  var base = new THREE.Shape();
    base.lineTo(0.0,0.3);
    base.lineTo(4.0,0.3);
    base.lineTo(4.0,0.0);
    
  return base;
}

function subtrair(meshA, meshB) {
  meshA.updateMatrix();
  meshB.updateMatrix();
  let bspA = CSG.fromMesh(meshA);
  let bspB = CSG.fromMesh(meshB);
  return bspA.subtract(bspB);
}

function uniao(meshA, meshB) {
  meshA.updateMatrix();
  meshB.updateMatrix();
  let bspA = CSG.fromMesh(meshA);
  let bspB = CSG.fromMesh(meshB);
  return bspA.union(bspB);
}

///////////////// Viga /////////////////

let alturaViga = 16;
// Um cilindro
var cylinderGeometry = new THREE.CylinderGeometry(0.5, 1, alturaViga, 32, 32);
var vigaMaterial = new THREE.MeshPhongMaterial({ color: 'white', wireframe: false });
var cylinder = new THREE.Mesh(cylinderGeometry, vigaMaterial);
// position the cylinder
cylinder.rotation.set(Math.PI / 2, 0, 0);
cylinder.scale.set(0.8,0.5,0.8);
cylinder.position.set(0.0, 0.0, (alturaViga*0.5) / 2);
// add the cylinder to the scene
scene.add(cylinder);

///////////////// Motor /////////////////

function baseShapeMotor() {
    //   var smileyShape1 = new THREE.Shape();
    //     smileyShape1.absarc( 0.0, 0.0, 4.0, 0, Math.PI * 2, false );
    var base = new THREE.Shape();
    base.moveTo(0, 0);
    base.lineTo(0.0, 3.0);
    base.lineTo(3.0, 3.0);
    base.lineTo(3.0, 0.0);
    base.lineTo(0.0, 0.0);

    return base;
}

var extrudeSettingsMotor =
{
    depth: 9.0,
    bevelEnabled: true,
    bevelThickness: 0.12,
    bevelSize: 0.7,
    bevelSegments: 6
};

var motorMaterial = new THREE.MeshPhongMaterial({ color: "blue", wireframe: false });
var extrudeGeometry = new THREE.ExtrudeGeometry(baseShapeMotor(), extrudeSettingsMotor);
var motor = new THREE.Mesh(extrudeGeometry, motorMaterial);

motor.scale.set(0.5,0.5,0.5);
motor.position.set(-0.7, 2.0, cylinder.position.z+4.3);
motor.rotateX(degreesToRadians(90))
// cylinder.add(motor);
scene.add(motor);


///////////////// Helice /////////////////

let raio = 0.5;
let comprimento = 2.0;
let numSegmentos = 8;
// Eixo da helice
var eixo = new THREE.Mesh(new THREE.CylinderGeometry(raio, raio, comprimento, numSegmentos, numSegmentos));
var esferaEixo = new THREE.Mesh(new THREE.SphereGeometry(raio, numSegmentos, numSegmentos));

eixo.position.add(new THREE.Vector3(0.0, 0.0, 0.0));
esferaEixo.position.add(new THREE.Vector3(0.0, comprimento / 2, 0.0));

let eixoResult = CSG.toMesh(uniao(eixo, esferaEixo), eixo.matrix, motorMaterial);
eixoResult.position.set(0.0,1.7,motor.position.z + (3.0*0.5)/2.0);


// Pá da helice
function f_cima(x) {
    return - 0.00050444108 * Math.pow(x, 3) - 0.00548790867 * Math.pow(x, 2) + 0.42137729564 * x;
}
function f_baixo(x) {
    return -0.00000409725 * Math.pow(x, 5) + 0.00037498806 * Math.pow(x, 4) - 0.01262982208 * Math.pow(x, 3) + 0.20413763608 * Math.pow(x, 2) - 1.44841011601 * x
}

var heliceShape = new THREE.Shape();

let numPontos = numSegmentos * 2;
let maxFuncoes = 23.97;
let pontos = []
for (let i = 0; i <= numPontos; i++) {
    let x = (maxFuncoes / numPontos) * i;
    let y = f_cima(x);
    if (x >= maxFuncoes) {
        y = 0;
    }
    pontos.push(new THREE.Vector2(x, y));
}
for (let i = numPontos; i >= 0; i--) {
    let x = (maxFuncoes / numPontos) * i;
    let y = f_baixo(x);
    if (x >= maxFuncoes) {
        y = 0;
    }
    pontos.push(new THREE.Vector2(x, y));
}

heliceShape.setFromPoints(pontos);

var extrudeSettings =
{
    depth: 0.5,
    bevelEnabled: true,
    bevelThickness: 0.2,
    bevelSize: 1,
    bevelOffset: 0,
    bevelSegments: 10
};

var heliceMaterial = new THREE.MeshPhongMaterial({ color: 'yellow', wireframe: false });
var extrudeGeometry = new THREE.ExtrudeGeometry(heliceShape, extrudeSettings);
var helice = new THREE.Mesh(extrudeGeometry);
helice.position.set(1, 0, 0);


let boxHelice = new THREE.Mesh(new THREE.BoxGeometry(4, 2, 0.8));
boxHelice.position.set(0, 0, 0.25);
let heliceResult = CSG.toMesh(uniao(boxHelice, helice), boxHelice.matrix, heliceMaterial);

// Clona a helice pra mais duas cópias
let heliceResult2 = heliceResult.clone();
let heliceResult3 = heliceResult.clone();

//scene.add(heliceResult);
//scene.add(heliceResult2);
//scene.add(heliceResult3);

//eixoResult.position.set(0, 0, 0);

//scene.add(eixoResult);

// Montagem final da helice
heliceResult.position.set(0, 1, 0);
heliceResult2.position.set(0, 1, 0);
heliceResult3.position.set(0, 1, 0);

heliceResult.rotation.set(degreesToRadians(-90), 0, 0);
heliceResult2.rotation.set(degreesToRadians(-90), 0, degreesToRadians(120));
heliceResult3.rotation.set(degreesToRadians(-90), 0, degreesToRadians(240));

var escala_largura = 0.2;
var escala_altura = 0.1;
heliceResult.scale.set(escala_largura, escala_altura, escala_largura);
heliceResult2.scale.set(escala_largura, escala_altura, escala_largura);
heliceResult3.scale.set(escala_largura, escala_altura, escala_largura);

heliceResult.translateX(0.8);
heliceResult2.translateX(0.8);
heliceResult3.translateX(0.8);

heliceResult.rotateX(degreesToRadians(30));
heliceResult2.rotateX(degreesToRadians(30));
heliceResult3.rotateX(degreesToRadians(30));


// Adiciona as helices no cilindro pra poder deixar elas de cor diferente
eixoResult.add(heliceResult)
eixoResult.add(heliceResult2)
eixoResult.add(heliceResult3)


scene.add(eixoResult);


// eixoResult.position.set(0, 7, alturaViga+1);

var clock = new THREE.Clock();

function roda_helice() {
    if(animationOn){
      var delta = clock.getDelta();
      let velAngular = degreesToRadians(speed);
      eixoResult.rotateY(delta * velAngular);
    }
    
}




////////////Botões e animação///////////
var speed =0.0;
var animationOn= false;
function buildInterface()
{
  var controls = new function ()
  {
    this.onChangeAnimation = function(){
      animationOn = !animationOn;
      console.log(animationOn);
    };
    this.speed = 0.00;

    this.changeSpeed = function(){
      speed = this.speed;
      console.log(speed);
    };
  };

  // GUI interface
  var gui = new GUI();
  gui.add(controls, 'onChangeAnimation',true).name("Animation On/Off");
  gui.add(controls, 'speed', 0.0, 360.0)
    .onChange(function(e) { controls.changeSpeed() })
    .name("Change Speed");
}



/////////////Render///////////////////////
buildInterface();
render();

function render()
{
  stats.update(); // Update FPS
  trackballControls.update();
  // // rotateCylinder();
  roda_helice();
  requestAnimationFrame(render);

  TWEEN.update();
  renderer.render(scene, camera) // Render scene
}