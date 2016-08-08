(function () {

    var id = window.location.href.match(/\?id=(.)/i)[1];

    var device = document.getElementById('device');

    var content = document.getElementById('content')

    new QRCode(document.getElementById('qrcode'), window.location.href.replace('/?', '/device/?'));

    var socket = io();

    socket.on('message rebuild' + id, function(msg) {
        content.style.transform = 'rotate3d(' + (-parseFloat(msg.x)) + ',' + (parseFloat(msg.y)) + ',' + (-parseFloat(msg.z)) + ',-' + msg.rotate + 'deg' + ')';
    });

    socket.on('message motion' + id, function(msg) {
        // device.style.transform = 'rotateX(' + msg.alpha + 'deg) ' + 'rotateY(' + msg.beta + 'deg) ' + 'rotateZ(' + msg.gamma + 'deg)';
        device.style.transform = 'rotate3d(' + (-parseFloat(msg.x)) + ',' + (parseFloat(msg.y)) + ',' + (-parseFloat(msg.z)) + ',' + msg.rotate + 'deg' + ')';
    });
})();

