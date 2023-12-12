const canvas = document.getElementById("myCanvas")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
const geom = {
    x: window.innerWidth / 2,
    y: window.innerHeight - window.innerHeight * 0.1,
    radius: 500,
    statrAngle: 0,
    endAngle: 180,
    anticlockwise: true
}

function toRadian(d) {
    // radian으로 변환하는 함수, 각도를 파라미터로 넣는다
    return (d * Math.PI) / 180;
}

function mousemove(event) {
    console.log(
        'pageX: ', event.pageX, 'pageY: ', event.pageY,
        'clientX: ', event.clientX, 'clientY:', event.clientY)
}

// function drawShape(x, y, width, height, color, isCircle = false) {
//     ctx.beginPath();
//     ctx.fillStyle = color;
//     if (isCircle) {
//         ctx.arc(x, y, width, 0, Math.PI * 2, false);
//     } else {
//         ctx.fillRect(x, y, width, height)
//     }
//     ctx.fill();
//     ctx.closePath();
// }
// drawShape(arcdotx-width/2,arcdoty-height/2,width,height,"#FF0000");


function draw() {

    let part = 10
    let eachDeg = 180 / part

    ctx.beginPath()
    for (let i = 1; i <= part; i++) {
        ctx.arc(geom.x, geom.y, geom.radius, geom.statrAngle, -toRadian(i*eachDeg), geom.anticlockwise)
        ctx.lineTo(geom.x, geom.y)
    }
    ctx.stroke()
    ctx.closePath();
}



window.addEventListener('mousemove', mousemove);
draw();

