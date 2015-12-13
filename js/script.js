let limit = 25;
let canvas = tag('canvas');
let ctx = canvas.getContext('2d');
let stars = [];
let color = '#fff'
let ratio;
let fps = 30,
    fpsInterval,
    startTime,
    now,
    then,
    elapsed;

import { log, tag, svgtag } from '../lib/bondage.js';
import Star from './star.js';
import random from '../lib/random.js';

let _HTMLElement = function() {};
_HTMLElement.prototype = HTMLElement.prototype;

class AmediaXmas extends _HTMLElement {

    startAnimating() {
        fpsInterval = 1000 / fps;
        then = window.performance.now();
        startTime = then;
        this.animate();
    }

    animate(newtime) {

        // request another frame

        let cb = this.animate.bind(this);
        requestAnimationFrame(cb);

        // calc elapsed time since last loop

        now = newtime;
        elapsed = now - then;

        // if enough time has elapsed, draw the next frame

        if (elapsed > fpsInterval) {

            // Get ready for next frame by setting then=now, but...
            // Also, adjust for fpsInterval not being multiple of 16.67
            then = now - (elapsed % fpsInterval);

            canvas.width = canvas.width;

            // ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.scale(ratio, ratio);

            let i = limit;

            while(i > 0) {
                i--;
                stars[i].reDraw();
            }
        }
    }

    createdCallback() {

        this.width = this.offsetWidth;
        this.height = this.offsetHeight;

        // use devicePixelRatio for hidpi devices
        ratio = window.devicePixelRatio || 1;

        color = this.getAttribute('star-color');

        // increase canvas size for hidpi devices
        canvas.width = this.width * ratio;
        canvas.height = this.height * ratio;

        // scale canvas down to original size with css
        canvas.style.width = this.width + 'px';
        canvas.style.height = this.height + 'px';

        ctx.scale(ratio, ratio);

        this.appendChild(canvas);

        let i = limit;

        while(i > 0) {
            i--;
            stars.push(new Star(ctx, color, {
                    x: random(0, this.width),
                    y: random(0, this.height),
                }));
        }

        this.startAnimating();

    }

}

document.registerElement('amedia-xmas', AmediaXmas);
