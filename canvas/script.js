(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}(this, function () { 'use strict';

    var babelHelpers = {};

    babelHelpers.classCallCheck = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };

    babelHelpers.createClass = (function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    })();

    babelHelpers.inherits = function (subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }

      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    };

    babelHelpers.possibleConstructorReturn = function (self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    };

    babelHelpers;
    var tag = document.createElement.bind(document);
    var svgtag = document.createElementNS.bind(document, 'http://www.w3.org/2000/svg');
    var txt = document.createTextNode.bind(document);
    var get = document.querySelector.bind(document);
    var getall = document.querySelectorAll.bind(document);
    var log = console.log.bind(console);
    var err = console.error.bind(console);

    var limit = 25;
    var canvas = tag('canvas');
    var ctx = canvas.getContext('2d');
    var stars = [];
    ctx.globalCompositeOperation = 'destination-over';
    var starColour = '#fff';
    var ratio = undefined;

    var pulseDir = 1;

    var minScale = 0.6;
    var starScale = 0.8;
    var maxScale = 1;
    var step = 0.012;

    var fps = 30;
    var fpsInterval = undefined;
    var startTime = undefined;
    var now = undefined;
    var then = undefined;
    var elapsed = undefined;
    var _HTMLElement = function _HTMLElement() {};
    _HTMLElement.prototype = HTMLElement.prototype;

    var AmediaXmas = (function (_HTMLElement2) {
        babelHelpers.inherits(AmediaXmas, _HTMLElement2);

        function AmediaXmas() {
            babelHelpers.classCallCheck(this, AmediaXmas);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(AmediaXmas).apply(this, arguments));
        }

        babelHelpers.createClass(AmediaXmas, [{
            key: 'rand',
            value: function rand(mult) {
                return Math.random() * mult;
            }
        }, {
            key: 'randomInt',
            value: function randomInt(a, b) {
                return Math.floor(Math.random() * (b - a + 1) + a);
            }
        }, {
            key: 'pulsate',
            value: function pulsate() {
                if (pulseDir === 1) {
                    starScale -= step;
                    if (starScale < minScale) {
                        pulseDir = -1;
                    }
                } else {
                    starScale += step;
                    if (starScale > maxScale) {
                        pulseDir = 1;
                    }
                }
                return starScale;
            }
        }, {
            key: 'starPulse',
            value: function starPulse(outerRadius) {

                return {
                    outerRadius: 10,
                    midRadius: 8,
                    innerRadius: 6
                };
            }
        }, {
            key: 'startAnimating',
            value: function startAnimating() {
                fpsInterval = 1000 / fps;
                then = window.performance.now();
                startTime = then;
                // console.log(startTime);
                this.animate();
            }
        }, {
            key: 'animate',
            value: function animate(newtime) {

                // request another frame

                var cb = this.animate.bind(this);
                requestAnimationFrame(cb);

                // calc elapsed time since last loop

                now = newtime;
                elapsed = now - then;

                // if enough time has elapsed, draw the next frame

                if (elapsed > fpsInterval) {

                    // Get ready for next frame by setting then=now, but...
                    // Also, adjust for fpsInterval not being multiple of 16.67
                    then = now - elapsed % fpsInterval;

                    var scale = this.pulsate();

                    // log('animating here', scale);

                    canvas.width = canvas.width;

                    // ctx.fillStyle = 'red';
                    // ctx.fillRect(0, 0, canvas.width, canvas.height);

                    ctx.scale(ratio, ratio);

                    var i = limit;

                    while (i > 0) {
                        i--;
                        this.drawStar(stars[i], scale);
                    }
                }
            }
        }, {
            key: 'drawStar',
            value: function drawStar(star, scale) {

                var spikes = 8;

                var outerRadius = 10.5 * scale,
                    innerRadius = 2 * scale,
                    mediumRadius = 6 * scale;

                var cx = star.x,
                    cy = star.y;

                var rotation = Math.PI / 2 * 3;

                var x = cx,
                    y = cy;

                var step = Math.PI / spikes;

                ctx.globalAlpha = scale;
                // ctx.strokeStyle = 'white';
                ctx.fillStyle = starColour;
                ctx.beginPath();
                ctx.moveTo(cx, cy - outerRadius);

                for (var i = 0; i < spikes; i++) {
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
                // ctx.stroke();
                ctx.fill();
                ctx.closePath();
                ctx.restore();
            }
        }, {
            key: 'createdCallback',
            value: function createdCallback() {

                this.width = this.offsetWidth;
                this.height = this.offsetHeight;

                // use devicePixelRatio for hidpi devices
                ratio = window.devicePixelRatio || 1;

                var i = limit;
                while (i > 0) {
                    stars.push({
                        x: this.width * this.rand(1),
                        y: this.height * this.rand(1)
                    });
                    i--;
                }

                starColour = this.getAttribute('star-color');

                // increase canvas size for hidpi devices
                canvas.width = this.width * ratio;
                canvas.height = this.height * ratio;

                // scale canvas down to original size with css
                canvas.style.width = this.width + 'px';
                canvas.style.height = this.height + 'px';

                this.appendChild(canvas);

                // this.draw();

                this.startAnimating();

                // window.requestAnimationFrame(this.draw.bind(this, canvas));

                // setInterval(this.draw.bind(this), 1000/fps).bind(this);
            }
        }]);
        return AmediaXmas;
    })(_HTMLElement);

    document.registerElement('amedia-xmas', AmediaXmas);

}));