const canvas = document.getElementById("myCanvas")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight ;

const ctx = canvas.getContext("2d");
const geom = {
    x: 120,
    y: 120,
    radius: 100,
    statrAngle: 0,
    endAngle: 360,
    anticlockwise: false
}

function drawShape(x, y, width, height, color, isCircle = false) {
    ctx.beginPath();
    ctx.fillStyle = color;
    if (isCircle)
    {
        ctx.arc(x, y, width, 0, Math.PI * 2, false);
    }
    else
    {
        ctx.fillRect(x, y, width, height)
    }
    ctx.fill();
    ctx.closePath();
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


function draw(){


    let part = 6
    let eachDeg = 360 / part
//

    ctx.beginPath()
    for(let i = 0; i <= part; i++){
        // arc(x, y, radius, startAngle, endAngle, anticlockwise)
        ctx.arc(geom.x, geom.y, geom.radius, toRadian(i * eachDeg), toRadian(i * eachDeg + eachDeg), geom.anticlockwise)
        ctx.lineTo(geom.x, geom.y)
    }
    ctx.stroke()

}


window.addEventListener('mousemove', mousemove);

let arcdotx= window.innerWidth/2;
let arcdoty= window.innerHeight- window.innerHeight*0.1;
let width =50
let height =50
let radius = 500
console.log(arcdotx,arcdoty);
drawShape(arcdotx-width/2,arcdoty-height/2,width,height,"#FF0000");
ctx.arc(arcdotx, arcdoty, radius, 0, toRadian(180), true); // x, y, 반지름, 시작 각도, 끝 각도(radian 값), true/false (반시계, 시계방향, 기본값은 false)
// 중심점을 기준으로. 캔버스 중앙에 그리려면 (캔버스 크기 / 2) 사이즈

ctx.stroke();

draw();
// drawShape(arcdotx,arcdoty,50,50,"#FF7F00");
// drawShape(arcdotx,arcdoty,50,50,"#FFFF00");
// drawShape(arcdotx,arcdoty,50,50,"#00FF00");
// drawShape(arcdotx,arcdoty,50,50,"#0000FF");
// drawShape(arcdotx,arcdoty,50,50,"#4B0082");
// drawShape(arcdotx,arcdoty,50,50,"#9400D3");


