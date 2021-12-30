import * as THREE from '../threejs-docs/build/three.module.js'

//#region Main Info

var /** @type { number } */ w = window.innerWidth;
var /** @type { number } */ h = window.innerHeight;
var /** @type { THREE.PerspectiveCamera } */ camera;
var /** @type { THREE.Scene } */ scene;
var /** @type { THREE.WebGLRenderer } */ renderer;

var /** @type { THREE.Mesh } */ bolaMesh;
var /** @type { THREE.Mesh } */ lantaiMesh;
var /** @type { THREE.Mesh } */ boxMesh;
var /** @type { THREE.Clock } */ clock = new THREE.Clock();

var /** @type { boolean } */ leftKey = false;
var /** @type { boolean } */ rightKey = false;
var clock = new THREE.Clock();
var delta = 0;

//#endregion

//#region Colors

var /** @type { number } */ colorWhite = 0xFFFFFF;
var /** @type { number } */ colorWood = 0x5a3b00;

//#endregion

//#region Game

var /** @type { number } */ ballSpeed = 0.1;

//#endregion

//#region Init

function main() {
    // Init Scene
    scene = new THREE.Scene();

    // Init Camera
    camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000)
    camera.position.set(0, -6, 0)

    // Init Renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true
    })
    renderer.setSize(w,h);
    renderer.setClearColor(colorWhite);

       // Sound Game
       const listener = new THREE.AudioListener();
       camera.add( listener );
       const sound = new THREE.Audio( listener );
       const audioLoader = new THREE.AudioLoader();
       audioLoader.load( './asset/Sound.mp3', function( buffer ) {
           sound.setBuffer( buffer );
           sound.setLoop( true );
           sound.setVolume( 0.5 );
           sound.play();
       });


       //Skybox
       const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
          '../asset/meadow_ft.jpg',
          '../asset/meadow_bk.jpg',
          '../asset/meadow_up.jpg',
          '../asset/meadow_dn.jpg',
          '../asset/meadow_rt.jpg',
          '../asset/meadow_lf.jpg'
        ]);
        scene.background = texture;

    document.body.appendChild(renderer.domElement);

    // Subscribe main input events
    document.onkeydown = onKeyDownEvent;
    document.onkeyup = onKeyUpEvent;
}

function onKeyDownEvent(/** @type { KeyboardEvent } */ ev) {
    ev.preventDefault();
    switch (ev.key) {
        case "a":
        case "ArrowLeft":
            leftKey = true;
            break;

        case "d":
        case "ArrowRight":
            rightKey = true;
            break;
    }
}

function onKeyUpEvent(/** @type { KeyboardEvent } */ ev) {
    ev.preventDefault();
    switch (ev.key) {
        case "a":
        case "ArrowLeft":
            leftKey = false;
            break;

        case "d":
        case "ArrowRight":
            rightKey = false;
            break;
    }
}

function bola() {
    var bolaSphereGeometry = new THREE.SphereGeometry(2, 64, 16)
    var textureLoader = new THREE.TextureLoader()
    var texturebola = textureLoader.load('../asset/bola.jpg')
    var bolaMaterial = new THREE.MeshBasicMaterial( { 
        side: THREE.DoubleSide,
        map: texturebola
    } )
    bolaMesh = new THREE.Mesh(bolaSphereGeometry, bolaMaterial)
    bolaMesh.position.set(0,-8, -20)
    camera.lookAt(bolaMesh.position)
    scene.add(bolaMesh)
}

function lantai() {
    var lantaiPlane = new THREE.PlaneGeometry(18,1000)
    var textureLoader = new THREE.TextureLoader()
    var texturelantai = textureLoader.load('../asset/jalan.png')
    var lantaiMaterial = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        map: texturelantai
    })
    texturelantai.repeat.set(1,2);
    lantaiMesh = new THREE.Mesh(lantaiPlane,lantaiMaterial)
    lantaiMesh.position.set(0, -10, 0)
    lantaiMesh.rotation.set(Math.PI/2,0,0)
    scene.add(lantaiMesh)
}

function box(x, y, z) {
    var boxBox = new THREE.BoxGeometry(6,14)
    var textureLoader = new THREE.TextureLoader()
    var texturebox = textureLoader.load('../asset/tembok.jpg')
    var boxMaterial = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        map: texturebox
    })
    boxMesh = new THREE.Mesh(boxBox,boxMaterial)
    boxMesh.position.set(x,y,z)
    scene.add(boxMesh)
}

//#endregion

//#region Update

function render() {
    requestAnimationFrame(render)
    renderer.render(scene,camera)

    bolaMesh.rotation.x -= Math.PI * clock.getDelta();
    bolaMesh.position.z -= ballSpeed;
    camera.position.set(0, 0, 30 + bolaMesh.position.z);

    processInput();

    praturanBagianLuar()
    praturanBagianDalam()
}

function processInput() {
    if ((leftKey || rightKey) && !(leftKey && rightKey)) {
        if (leftKey) {
            bolaMesh.position.x -= ballSpeed;
        } else if (rightKey) {
            bolaMesh.position.x += ballSpeed;
        }
    }
}

function praturanBagianLuar() {
    if(bolaMesh.position.x <= -9){
        return bolaMesh.position.z = -20;
    }
    else if(bolaMesh.position.x >=9){
        return bolaMesh.position.z = -20;
    }
}

function praturanBagianDalam() {
    if(bolaMesh.position.z == -30.000000000000142){
        if(bolaMesh.position.x <= -1){
            return bolaMesh.position.z = -20;
        }
        else if(bolaMesh.position.x >= 1){
            return bolaMesh.position.z = -20;
        }
    }

    if(bolaMesh.position.z == -60.00000000000057){
        if(bolaMesh.position.x >= -5 && bolaMesh.position.x <= 5){
            return bolaMesh.position.z = -20;
        }
    }

    if(bolaMesh.position.z == -90.09999999999914){
        if(bolaMesh.position.x <= 5){
            return bolaMesh.position.z = -20;
        }
    }

    if(bolaMesh.position.z == -120.09999999999744){
        if(bolaMesh.position.x >= -5){
            return bolaMesh.position.z = -20;
        }
    }

    if(bolaMesh.position.z == -150.09999999999573){
        if(bolaMesh.position.x <= -1){
            return bolaMesh.position.z = -20;
        }
        else if(bolaMesh.position.x >= 1){
            return bolaMesh.position.z = -20;
        }
    }

    if(bolaMesh.position.z == -180.09999999999403){
        if(bolaMesh.position.x >= -5 && bolaMesh.position.x <= 5){
            return bolaMesh.position.z = -20;
        }
    }

    if(bolaMesh.position.z == -210.09999999999232){
        if(bolaMesh.position.x <= 5){
            return bolaMesh.position.z = -20;
        }
    }

    if(bolaMesh.position.z == -240.09999999999062){
        if(bolaMesh.position.x >= -5){
            return bolaMesh.position.z = -20;
        }
    }

    if(bolaMesh.position.z == -260.09999999999064){
        delta = Math.round(clock.getElapsedTime());
    
        alert('You Win in :'+delta+' s');
        return bolaMesh.position.z = -20;
    }
}

//#endregion

window.onload = () =>{
    main()
    bola()
    lantai()
    box(6,-10,-30)
    box(-6,-10,-30)
    box(0,-10,-60)
    box(0,-10,-90)
    box(-6,-10,-90)
    box(0,-10,-120)
    box(6,-10,-120)
    box(6,-10,-150)
    box(-6,-10,-150)
    box(0,-10,-180)
    box(0,-10,-210)
    box(-6,-10,-210)
    box(0,-10,-240)
    box(6,-10,-240)
    render()
}