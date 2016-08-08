(function () {

    var id = window.location.href.match(/\?id=(.)/i)[1];

    var socket = io();

    var motionInfo = {}

    window.addEventListener('deviceorientation', function (evt) {

        socket.emit('device message', {
            id: id,
            alpha: evt.alpha,
            beta: evt.beta,
            gamma: evt.gamma
        });

        document.getElementById('content').innerHTML =
            "x: " + evt.alpha + "<br>"
            + "y: " + evt.gamma + "<br>"
            + "z: " + evt.beta + "<br>";

    }, true);
})();