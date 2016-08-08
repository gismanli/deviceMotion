(function () {

    var id = window.location.href.match(/\?id=(.)/i)[1];

    var device = document.getElementById('device');

    var content = document.getElementById('content')

    new QRCode(document.getElementById('qrcode'), window.location.href.replace('/?', '/device/?'));

    var socket = io();
    
    socket.on('message motion' + id, function(msg) {
        device.style.transform = 'rotate(' + msg.rotate + 'deg)';
    });
})();