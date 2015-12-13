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

    function random (min, max) {
        min = min * 100;
        max = max * 100;
        return (Math.random() * (max - min + 1) + min) / 100;
    }

    var rotation = Math.PI / 2 * 3;
    var minScale = 0.3;
    var maxScale = 1;
    var step = 0.012;

    var Star = (function () {
        function Star(context, col, position) {
            babelHelpers.classCallCheck(this, Star);

            this.x = position.x;
            this.y = position.y;
            this.ctx = context;
            this.color = col;
            this.pulseDir = 1;
            this.starScale = this.random(minScale, maxScale);
            this.draw(this.starScale);
        }

        babelHelpers.createClass(Star, [{
            key: 'random',
            value: function random(min, max) {
                min = min * 100;
                max = max * 100;
                return (Math.random() * (max - min + 1) + min) / 100;
            }
        }, {
            key: 'reDraw',
            value: function reDraw() {
                this.draw(this.pulsate());
            }
        }, {
            key: 'draw',
            value: function draw(scale) {
                var xPosition = this.x;
                var yPosition = this.y;
                var ctx = this.ctx;
                var color = this.color;

                var spikes = 8;

                var outerRadius = 10.5 * scale,
                    innerRadius = 2 * scale,
                    mediumRadius = 6 * scale;

                var cx = xPosition,
                    cy = yPosition;

                var x = cx,
                    y = cy;

                var step = Math.PI / spikes;

                ctx.globalAlpha = scale;
                ctx.fillStyle = color;
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
                ctx.fill();
                ctx.closePath();
                ctx.globalAlpha = 1;
            }
        }, {
            key: 'pulsate',
            value: function pulsate() {
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
        }]);
        return Star;
    })();

    var limit = 25;
    var canvas = tag('canvas');
    var ctx = canvas.getContext('2d');
    var stars = [];
    var color = '#fff';
    var ratio = undefined;
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
            key: 'startAnimating',
            value: function startAnimating() {
                fpsInterval = 1000 / fps;
                then = window.performance.now();
                startTime = then;
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

                    canvas.width = canvas.width;

                    // ctx.fillRect(0, 0, canvas.width, canvas.height);

                    ctx.scale(ratio, ratio);

                    var i = limit;

                    while (i > 0) {
                        i--;
                        stars[i].reDraw();
                    }
                }
            }
        }, {
            key: 'createdCallback',
            value: function createdCallback() {

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

                var i = limit;

                while (i > 0) {
                    i--;
                    stars.push(new Star(ctx, color, {
                        x: random(0, this.width),
                        y: random(0, this.height)
                    }));
                }

                this.startAnimating();
            }
        }]);
        return AmediaXmas;
    })(_HTMLElement);

    document.registerElement('amedia-xmas', AmediaXmas);

}));