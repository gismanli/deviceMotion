(function () {

    var id = window.location.href.match(/\?id=(.)/i)[1];

    var socket = io();

    var lastPaintRotate = 0;

    window.addEventListener('devicemotion', function (evt) {

        var rotate = parseFloat((Math.atan2(0 - evt.accelerationIncludingGravity.x.toFixed(2), evt.accelerationIncludingGravity.y).toFixed(2) / Math.PI * 180).toFixed(2));

        if (Math.abs(lastPaintRotate - rotate) > 2) {
            socket.emit('device message', {
                id: id,
                rotate: deviceMotionHandler(evt.accelerationIncludingGravity)
            });
            lastPaintRotate = rotate;
        }
        document.getElementById('content').innerHTML =
            "x轴加速度: " + evt.accelerationIncludingGravity.x + "<br>"
            + "y轴加速度: " + evt.accelerationIncludingGravity.y + "<br>"
            + "z轴加速度: " + evt.accelerationIncludingGravity.z + "<br>"
    }, true);

    function deviceMotionHandler(msg){
        var angle =
            Math.atan2(
                0 - msg.x ,
                msg.y
            ).toFixed(2) / Math.PI * 180 ;
        return angle;
    }
    
})();