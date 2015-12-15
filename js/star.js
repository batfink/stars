const minScale = 0.3;
const maxScale = 1;
const increment = 0.015;
const spikes = 8;
const step = Math.PI/spikes;
const starSize = 21;
let star;
let rotation = Math.PI/2*3;

import { log } from '../lib/bondage.js';
import random from '../lib/random.js';

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
}

export default class Star {

    set position(xy) {
        this.x = xy[0];
        this.y = xy[1];
    }

    get position() {
        return [ this.x, this.y ];
    }

    constructor(context, color, ratio, xy) {
        this.position = xy;
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

    // rePosition(position) {
    //     this.x = position.x;
    //     this.y = position.y;
    // }

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
