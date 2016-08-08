(function () {

    var id = window.location.href.match(/\?id=(.)/i)[1];

    var socket = io();

    var motionInfo = {}

    document.getElementById('rebuild').onclick = function () {
        socket.emit('rebuild message', {
            id: id,
            x: motionInfo.x,
            y: motionInfo.y,
            z: motionInfo.z,
            rotate: motionInfo.rotate
        });
    }

    window.addEventListener('deviceorientation', function (evt) {

        var rotate3d = deviceMotionHandler(evt);

        socket.emit('device message', {
            id: id,
            x: rotate3d.x,
            y: rotate3d.y,
            z: rotate3d.z,
            rotate: rotate3d.rotate
        });

        motionInfo.x = rotate3d.x;
        motionInfo.y = rotate3d.y;
        motionInfo.z = rotate3d.z;
        motionInfo.rotate = rotate3d.rotate;

        document.getElementById('content').innerHTML =
            ": " + evt.alpha + "<br>"
            + ": " + evt.gamma + "<br>"
            + ": " + evt.beta + "<br>";

    }, true);

    var degtorad = Math.PI / 180;
    function getQuaternion( alpha, beta, gamma ) {  //官方求四元数方法

        var _x = beta  ? beta  * degtorad : 0; // beta value
        var _y = gamma ? gamma * degtorad : 0; // gamma value
        var _z = alpha ? alpha * degtorad : 0; // alpha value

        var cX = Math.cos( _x/2 );
        var cY = Math.cos( _y/2 );
        var cZ = Math.cos( _z/2 );
        var sX = Math.sin( _x/2 );
        var sY = Math.sin( _y/2 );
        var sZ = Math.sin( _z/2 );

        var w = cX * cY * cZ - sX * sY * sZ;
        var x = sX * cY * cZ - cX * sY * sZ;
        var y = cX * sY * cZ + sX * cY * sZ;
        var z = cX * cY * sZ + sX * sY * cZ;

        return [ w, x, y, z ];

    }

    function getAcQuaternion( _w, _x, _y, _z ) {  //我的四元数转旋转轴和旋转角度方法

        var rotate = 2 * Math.acos(_w)/degtorad ;

        var x = _x / Math.sin(degtorad * rotate/2) || 0;
        var y = _y / Math.sin(degtorad * rotate/2) || 0;
        var z = _z / Math.sin(degtorad * rotate/2) || 0;

        return {
            x: x,
            y: y,
            z: z,
            rotate: rotate
        };

    }

    function deviceMotionHandler(evt){  // deviceorientation 事件处理函数
        var qu = getQuaternion(evt.alpha,evt.beta,evt.gamma);
        var rotate3d = getAcQuaternion(qu[0],qu[1],qu[2],qu[3]);
        return rotate3d;
    }

})();