function drawCircle(x, y, radius, color) {
    ctx.beginPath();
    ctx.save();
    ctx.fillStyle = color;
    ctx.arc(x, y, radius, Math.PI * 2, false);
    ctx.fill();
    ctx.restore();
    ctx.closePath();
}

function drawRing(x, y, radius, color, ringWidth) {
    ctx.beginPath();
    ctx.save();
    ctx.lineWidth = ringWidth;
    ctx.strokeStyle = color;
    ctx.arc(x, y, radius, Math.PI * 2, false);
    ctx.stroke();
    ctx.restore();
    ctx.closePath();
}

function drawArc(x, y, radius, color, ringWidth, startAngle, endAngle, anticlockwise) {
    ctx.beginPath();
    ctx.save();
    ctx.lineWidth = ringWidth;
    ctx.strokeStyle = color;
    ctx.arc(x, y, radius, degreeToRadian(startAngle), degreeToRadian(endAngle), false);
    ctx.stroke();
    ctx.restore();
    ctx.closePath();
}

function drawText(x, y, text, font, size, color) {
    ctx.beginPath();
    ctx.save();
    ctx.font = `${size}pt ${font}`;
    ctx.fillStyle = color;
    ctx.fillText(text, x - (ctx.measureText(text).width / 2), y);
    ctx.restore();
    ctx.closePath();
}

function drawRect(x, y, width, height, color) {
    ctx.beginPath();
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
    ctx.fill();
    ctx.restore();
    ctx.closePath();
}

function drawPolygon(points, color) {
    ctx.beginPath();
    ctx.save();
    for (let i = 0; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
    ctx.closePath();
}

function degreeToRadian(degrees) {
	return degrees * (Math.PI / 180);
}