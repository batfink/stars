let limit = 25;
let canvas = tag('canvas');
let ctx = canvas.getContext('2d');
let stars = [];
let color = '#fff'
let ratio;

import { log, tag } from '../lib/bondage.js';
import Star from './star.js';
import random from '../lib/random.js';

let _HTMLElement = function() {};
_HTMLElement.prototype = HTMLElement.prototype;

class AmediaXmas extends _HTMLElement {

    animate() {

        // request next frame
        let cb = this.animate.bind(this);
        requestAnimationFrame(cb);

        // clear canvas
        canvas.width = canvas.width;

        let i = limit;
        while(i > 0) {
            i--;
            stars[i].reDraw();
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

        // scale canvas to original size with css
        canvas.style.width = this.width + 'px';
        canvas.style.height = this.height + 'px';

        // increase context size for hidpi devices
        ctx.scale(ratio, ratio);

        this.appendChild(canvas);

        let i = limit;

        while(i > 0) {
            i--;
            stars.push(new Star(ctx, color, ratio, {
                    x: random(0, this.width),
                    y: random(0, this.height),
                }));
        }

        this.animate();

    }

}

document.registerElement('amedia-xmas', AmediaXmas);
