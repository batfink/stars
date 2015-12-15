const limit = 25;
const canvas = tag('canvas');
const ctx = canvas.getContext('2d');
let stars = [];
let color = '#fff'
let ratio;
let running = false;

import { log, tag } from '../lib/bondage.js';
import Star from './star.js';
import random from '../lib/random.js';

let _HTMLElement = function() {};
_HTMLElement.prototype = HTMLElement.prototype;

class AmediaXmas extends _HTMLElement {

    updateStarPositions() {

        let oldWidth = this.width;
        let oldHeight = this.height;

        // reflow
        let newWidth = this.offsetWidth;
        let newHeight = this.offsetHeight;

        this.width = newWidth;
        this.height = newHeight;

        // increase canvas size for hidpi devices
        // repaint
        canvas.width = this.width * ratio;
        canvas.height = this.height * ratio;

        // scale canvas to original size with css
        // repaint
        canvas.style.width = this.width + 'px';
        canvas.style.height = this.height + 'px';

        let i = limit;
        while(i > 0) {
            i--;
            let oldPosition = stars[i].position;
            let newPosition = [ (oldPosition[0]/oldWidth) * newWidth, (oldPosition[1]/oldHeight) * newHeight ];
            stars[i].position = newPosition;
        }

        running = false;
    }

    resize() {
        if (!running) {
            running = true;
            if (window.requestAnimationFrame) {
                requestAnimationFrame(this.updateStarPositions.bind(this));
            } else {
                setTimeout(this.updateStarPositions.bind(this), 66);
            }
        }
    }

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
            stars.push(new Star(ctx, color, ratio,
                [ random(0, this.width), random(0, this.height) ]
            ));
        }

        this.animate();

        window.addEventListener('resize', this.resize.bind(this));

    }

}

document.registerElement('amedia-xmas', AmediaXmas);
