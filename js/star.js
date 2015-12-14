let rotation = Math.PI/2*3;
let minScale = 0.3;
let maxScale = 1;
let increment = 0.02;
let spikes = 8;
let step = Math.PI/spikes;

import { log } from '../lib/bondage.js';
import random from '../lib/random.js';

let star;
let starSize = 21;

function drawStar(color, ratio) {
    let canvas = document.createElement('canvas');
    canvas.width = starSize * ratio;
    canvas.height = starSize * ratio;

    let ctx = canvas.getContext('2d');
    ctx.scale(ratio, ratio);

    let outerRadius = starSize / 2,
        innerRadius = starSize / (starSize/2),
        mediumRadius = (starSize / 3) - 1;

    let cx = starSize / 2,
        cy = starSize / 2;

    let x = cx,
        y = cy;

    // ctx.globalAlpha = scale;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);

    let count = spikes;

    while (count > 0) {
        x = cx + Math.cos(rotation) * outerRadius;
        y = cy + Math.sin(rotation) * outerRadius;
        ctx.lineTo(x, y);
        rotation += step;

        x = cx + Math.cos(rotation) * innerRadius;
        y = cy + Math.sin(rotation) * innerRadius;
        ctx.lineTo(x, y);
        rotation += step;

        x = cx + Math.cos(rotation) * mediumRadius;
        y = cy + Math.sin(rotation) * mediumRadius;
        ctx.lineTo(x, y);
        rotation += step;

        x = cx + Math.cos(rotation) * innerRadius;
        y = cy + Math.sin(rotation) * innerRadius;
        ctx.lineTo(x, y);
        rotation += step;

        count--;
    }

    ctx.lineTo(cx, cy - outerRadius);
    ctx.fill();
    ctx.closePath();
    return canvas;
    // ctx.globalAlpha = 1;
}

export default class Star {

    constructor(context, color, ratio, position) {
        this.x = position.x;
        this.y = position.y;
        this.ctx = context;
        this.color = color;
        this.pulseDir = 1;
        this.starScale = random(minScale, maxScale);
        this.ratio = ratio;

        if (star === undefined) {
            star = drawStar(color, ratio);
        }

        this.draw(this.starScale);
    }

    reDraw() {
        this.draw(this.pulsate());
    }

    draw(scale) {

        let ctx = this.ctx;
        ctx.globalAlpha = scale;
        ctx.setTransform(this.ratio, 0, 0, this.ratio, 0, 0);
        ctx.translate(this.x, this.y);

        let size = starSize * scale;
        ctx.drawImage(star, -(size/2), -(size/2), size, size);
        ctx.globalAlpha = 1;

    }

    pulsate() {
        if (this.pulseDir === 1) {
            this.starScale -= increment;
            if (this.starScale < minScale) {
                this.pulseDir = -1;
            }
        } else {
            this.starScale += increment;
            if (this.starScale > maxScale) {
                this.pulseDir = 1;
            }
        }
        return this.starScale;
    }
}
