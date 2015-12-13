let rotation = Math.PI/2*3;
let minScale = 0.3;
let maxScale = 1;
let step = 0.012;

import { log } from '../lib/bondage.js';
import random from '../lib/random.js';

export default class Star {

    constructor(context, col, position) {
        this.x = position.x;
        this.y = position.y;
        this.ctx = context;
        this.color = col;
        this.pulseDir = 1;
        this.starScale = this.random(minScale, maxScale);
        this.draw(this.starScale);
    }

    random(min, max) {
        min = min * 100;
        max = max * 100;
        return ((Math.random() * ( max - min + 1 )) + min)/100;
    }

    reDraw() {
        this.draw(this.pulsate());
    }

    draw(scale) {
        let xPosition = this.x;
        let yPosition = this.y;
        let ctx = this.ctx;
        let color = this.color;

        let spikes = 8;

        let outerRadius = 10.5 * scale, innerRadius = 2 * scale, mediumRadius = 6 * scale;

        let cx = xPosition, cy = yPosition;

        let x = cx, y = cy;

        let step = Math.PI/spikes;

        ctx.globalAlpha = scale;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);

        for (let i = 0; i < spikes; i++) {
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
        }

        ctx.lineTo(cx, cy - outerRadius);
        ctx.fill();
        ctx.closePath();
        ctx.globalAlpha = 1;
    }

    pulsate() {
        if (this.pulseDir === 1) {
            this.starScale -= step;
            if (this.starScale < minScale) {
                this.pulseDir = -1;
            }
        } else {
            this.starScale += step;
            if (this.starScale > maxScale) {
                this.pulseDir = 1;
            }
        }
        return this.starScale;
    }
}
