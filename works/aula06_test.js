// // Exercício do cata-vento
// import * as THREE from  '../build/three.module.js';
// import Stats from       '../build/jsm/libs/stats.module.js';
// import {GUI} from       '../build/jsm/libs/dat.gui.module.js';
// import {TrackballControls} from '../build/jsm/controls/TrackballControls.js';
// import {initRenderer, 
//         initCamera, 
//         degreesToRadians, 
//         onWindowResize,
//         initDefaultBasicLight} from "../libs/util/util.js";
// import * as TWEEN from "../libs/other/tween.js/dist/tween.esm.js";


// ////////// Coisas da cena, como renderização, camera/////////////////////

// var stats = new Stats();          // To show FPS information
// var scene = new THREE.Scene();    // Create main scene
// var renderer = initRenderer();    // View function in util/utils
// var camera = initCamera(new THREE.Vector3(0, 0, 15)); // Init camera in this position
// // var cameraSimula = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 8000);
// // cameraSimula.lookAt(0, 0, 0);
// cameraSimula.position.set(0.0, 0.0, -1.0);



// var trackballControls = new TrackballControls( camera, renderer.domElement );
// initDefaultBasicLight(scene);

// // Listen window size changes
// window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );



// render();


// // Make 2 box meshes.. 

// let meshA = new THREE.Mesh(new THREE.BoxGeometry(1,1,1))
// let meshB = new THREE.Mesh(new THREE.BoxGeometry(1,1,1))

// //offset one of the boxes by half its width..

// meshB.position.add(new THREE.Vector3( 0.5, 0.5, 0.5)

// //Make sure the .matrix of each mesh is current

// meshA.updateMatrix()
// meshB.updateMatrix()

//  //Create a bsp tree from each of the meshes
 
// let bspA = CSG.fromMesh( meshA )                        
// let bspB = CSG.fromMesh( meshB )

// // Subtract one bsp from the other via .subtract... other supported modes are .union and .intersect
 
// let bspResult = bspA.subtract(bspB)

// //Get the resulting mesh from the result bsp, and assign meshA.material to the resulting mesh

// let meshResult = CSG.toMesh( bspResult, meshA.matrix, meshA.material )

// /////////////Render///////////////////////
// buildInterface();
// render();
// function render()
// {
//   stats.update(); // Update FPS
//   trackballControls.update();
//   // rotateCylinder();
//   requestAnimationFrame(render);

//   TWEEN.update();
//   renderer.render(scene, camera) // Render scene
// }