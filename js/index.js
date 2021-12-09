import * as THREE from '../threejs-docs/build/three.module.js'

var w = window.innerWidth
var h = window.innerHeight
var camera, scene, renderer

var bolaMesh, lantaiMesh, boxMesh

function main() {
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000)
    camera.position.set(0, -6, 0)

    renderer = new THREE.WebGLRenderer({
        antialias: true
    })

    renderer.setSize(w,h)
    renderer.setClearColor(0xFFFFFF)

    document.body.appendChild(renderer.domElement)
}

function bola() {
    var bolaSphereGeometry = new THREE.SphereGeometry(2, 64, 16)
    var textureLoader = new THREE.TextureLoader()
    var texturebola = textureLoader.load('./asset/bola.jpg')
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
    var lantaiMaterial = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        color: '#5a3b00'
    })
    lantaiMesh = new THREE.Mesh(lantaiPlane,lantaiMaterial)
    lantaiMesh.position.set(0, -10, 0)
    lantaiMesh.rotation.set(Math.PI/2,0,0)
    scene.add(lantaiMesh)
}

function box(x, y, z) {
    var boxBox = new THREE.BoxGeometry(6,14)
    var textureLoader = new THREE.TextureLoader()
    var texturebox = textureLoader.load('./asset/tembok.jpg')
    var boxMaterial = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        map: texturebox
    })
    boxMesh = new THREE.Mesh(boxBox,boxMaterial)
    boxMesh.position.set(x,y,z)
    scene.add(boxMesh)
}

function render() {
    requestAnimationFrame(render)
    renderer.render(scene,camera)

    bolaMesh.rotation.x += 0.1
    bolaMesh.position.z -= 0.1
    lantaiMesh.position.z += 0.1
    camera.position.set(0, 0, 30 + bolaMesh.position.z)

    console.log(bolaMesh.position.z)

    praturanBagianLuar()
    praturanBagianDalam()
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
        console.log("1");
        if(bolaMesh.position.x <= -1){
            return bolaMesh.position.z = -20;
        }
        else if(bolaMesh.position.x >= 1){
            return bolaMesh.position.z = -20;
        }
    }

    if(bolaMesh.position.z == -60.00000000000057){
        console.log("1");
        if(bolaMesh.position.x >= -5 && bolaMesh.position.x <= 5){
            return bolaMesh.position.z = -20;
        }
    }

    if(bolaMesh.position.z == -90.09999999999914){
        console.log("1");
        if(bolaMesh.position.x <= 5){
            return bolaMesh.position.z = -20;
        }
    }

    if(bolaMesh.position.z == -120.09999999999744){
        console.log("1");
        if(bolaMesh.position.x >= -5){
            return bolaMesh.position.z = -20;
        }
    }

    if(bolaMesh.position.z == -150.09999999999573){
        console.log("1");
        if(bolaMesh.position.x <= -1){
            return bolaMesh.position.z = -20;
        }
        else if(bolaMesh.position.x >= 1){
            return bolaMesh.position.z = -20;
        }
    }

    if(bolaMesh.position.z == -180.09999999999403){
        console.log("1");
        if(bolaMesh.position.x >= -5 && bolaMesh.position.x <= 5){
            return bolaMesh.position.z = -20;
        }
    }

    if(bolaMesh.position.z == -210.09999999999232){
        console.log("1");
        if(bolaMesh.position.x <= 5){
            return bolaMesh.position.z = -20;
        }
    }

    if(bolaMesh.position.z == -240.09999999999062){
        console.log("1");
        if(bolaMesh.position.x >= -5){
            return bolaMesh.position.z = -20;
        }
    }

    if(bolaMesh.position.z == -260.09999999999064){
        alert('You Win!')
        return bolaMesh.position.z = -20;
    }
}

let keyListener = event =>{
    let keyCode = event.keyCode;
    if(keyCode == 65){
        bolaMesh.position.x -= 1
        bolaMesh.rotation.z += 0.5
    }
    else if(keyCode == 68){
        bolaMesh.position.x += 1
        bolaMesh.rotation.z -= 0.5
    }   
}

function addListener() {
    document.addEventListener("keydown",keyListener);
}

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
    addListener()
    render()
}