var videoplay = document.querySelector('video#player');

var audioSource = document.querySelector("select#audioSource");
var audioOutput = document.querySelector("select#audioOutput");
var videoSource = document.querySelector("select#videoSource");

function gotMediaStream(stream) {
    videoplay.srcObject = stream;
    return navigator.mediaDevices.enumerateDevices();
}

function gotDevices(deviceInfo) {
    deviceInfo.forEach(deviceInfo => {
        var option = document.createElement('option');
        option.text = deviceInfo.label;
        option.value = deviceInfo.deviceId;
        if (deviceInfo.kind === 'audioinput') {
            audioSource.appendChild(option);
        }else if(deviceInfo.kind === 'audiooutput') {
            audioOutput.appendChild(option);
        }else if(deviceInfo.kind === 'videoinput') {
            videoSource.appendChild(option);
        }
    });
}

function handleError(err) {
    console.log('getUserMedia errot', err);
}
function start() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.log('getUserMedia is not supported');
        return;
    }else {
        var deviceId = videoSource.value;
        var constraints = {
            video: {
                width: 640,
                height: 480,
                frameRate: 30,
                deviceId: deviceId ? deviceId :undefined
            },
            audio:true
        }
    
        navigator.mediaDevices.getUserMedia(constraints)
                                .then(gotMediaStream)
                                .then(gotDevices)
                                .catch(handleError);
    
    }
}

start();
videoSource.onchange = start;
