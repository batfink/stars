import { log, tag, svgtag } from '../lib/bondage.js';

let limit = 25;
let banner = svgtag('svg');

let _HTMLElement = function() {};
_HTMLElement.prototype = HTMLElement.prototype;

class AmediaXmasSVG extends _HTMLElement {

    rand(mult) {
        return Math.random()*mult;
    }

    newStar() {
        let star = svgtag('svg');
        let use = svgtag('use');

        // star.setAttribute('width', 21);
        // star.setAttribute('height', 21);

        star.setAttribute('class', 'star');
        star.style.webkitAnimationDelay=this.rand(5)+"s";
        star.style.animationDelay=this.rand(5)+"s";

        use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#star');
        use.setAttribute('fill', this.getAttribute('star-color'));

        use.style.webkitTranform = 'scale(' + (this.rand(0.25)) + ')';
        use.style.transform = 'scale(' + (this.rand(0.25)) + ')';

        star.appendChild(use);
        return star;
    }

    start() {
        let i = limit;
        while(i > 0) {
            let star = this.newStar();
            star.setAttribute('x', this.width * this.rand(1));
            star.setAttribute('y', this.height * this.rand(1));
            banner.appendChild(star);
            i--;
        }
    }

    createdCallback() {

        this.width = this.offsetWidth;
        this.height = this.offsetHeight;

        banner.setAttribute('viewBox', '0 0 ' + this.width + ' ' + this.height);
        banner.setAttribute('version', '1.1');
        banner.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        banner.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');

        this.appendChild(banner);

        let star = svgtag('symbol');
        star.setAttribute('viewBox', '0 0 21 21');
        star.id = 'star';

        let cross = svgtag('symbol');
        cross.setAttribute('viewBox', '0 0 21 21');
        cross.id = 'cross';

        let path = svgtag('path');
        path.setAttribute('d', 'M0,10 L9.45,9.45 L10,0 L10.55,9.45 L20,10 L10.55,10.55 L10,20 L9.45,10.55 Z');
        cross.appendChild(path);

        let crossBig = svgtag('use');
        crossBig.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#cross');

        let crossSmall = svgtag('use');
        crossSmall.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#cross');
        crossSmall.setAttribute('transform', 'scale(0.7) translate(4.285,4.285) rotate(45 10 10)');

        star.appendChild(crossBig);
        star.appendChild(crossSmall);

        banner.appendChild(cross);
        banner.appendChild(star);

        this.start();

    }

}

document.registerElement('amedia-xmas-svg', AmediaXmasSVG);
