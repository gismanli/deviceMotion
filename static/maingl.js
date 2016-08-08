(function () {

    var id = window.location.href.match(/\?id=(.)/i)[1];

    var device = document.getElementById('device');

    var content = document.getElementById('content')

    new QRCode(document.getElementById('qrcode'), window.location.href.replace('/?', '/device/?'));

    var socket = io();

    var degtorad = Math.PI / 180;
    

    socket.on('message motion' + id, function(msg) {

        renderer.clear();
        var translation = new THREE.Matrix4().makeTranslation(parseFloat(msg.alpha * degtorad), parseFloat(msg.gamma * degtorad), parseFloat(msg.beta * degtorad));
        // scene.rotate.set(parseFloat(msg.alpha * degtorad), parseFloat(msg.gamma * degtorad), parseFloat(msg.beta * degtorad), 'XYZ');
        cube.applyMatrix(translation);
        renderer.render(scene,camera);
     });

    // three
    var renderer;
    function initThree() {
        width = device.clientWidth;
        height = device.clientHeight;
        renderer = new THREE.WebGLRenderer({
            antialias: true
        })

        renderer.setSize(width, height);
        device.appendChild(renderer.domElement);

        renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
    }

    var camera;
    function initCamera() {
        camera = new THREE.PerspectiveCamera(45, width / height, 1, 100000);
        camera.position.x = 400;
        camera.position.y = 0;
        camera.position.z = 0;
        camera.up.x = 0;
        camera.up.y = 0;
        camera.up.z = 1;
        camera.lookAt({x:0, y:0, z:0});
    }

    var scene;
    function initScene() {
        scene = new THREE.Scene();
    }

    var light;
    function initLight() {
        light = new THREE.DirectionalLight(0x0000FF,1.0,0);
        light.position.set(50,50,50);
        scene.add(light);
    }

    var cube;
    function initObject() {

        // var loader = new THREE.ObjectLoader();
        // loader.load('/static/Vayne.obj', function(obj) {
        //     mesh = obj; //储存到全局变量中
        //     scene.add(obj);
        // });

        cube = new THREE.Mesh(
            new THREE.CubeGeometry(50,50,50),
            new THREE.MeshLambertMaterial({color:0x0000FF})
        );
        scene.add(cube);
        cube.position.set(0,0,0);
    }

    function threeStart() {
        initThree();
        initCamera();
        initScene();
        initLight();
        initObject();
        renderer.clear();
        renderer.render(scene, camera);
    }

    threeStart();

})();