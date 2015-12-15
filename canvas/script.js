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
    function random (min, max) {
        min = min * 100;
        max = max * 100;
        return (Math.random() * (max - min + 1) + min) / 100;
    }

    var tag$1 = document.createElement.bind(document);
    var svgtag = document.createElementNS.bind(document, 'http://www.w3.org/2000/svg');
    var txt = document.createTextNode.bind(document);
    var get = document.querySelector.bind(document);
    var getall = document.querySelectorAll.bind(document);
    var log = console.log.bind(console);
    var err = console.error.bind(console);

    var rotation = Math.PI / 2 * 3;
    var minScale = 0.3;
    var maxScale = 1;
    var increment = 0.015;
    var spikes = 8;
    var step = Math.PI / spikes;
    var star = undefined;
    var starSize = 21;

    function drawStar(color, ratio) {
        var canvas = document.createElement('canvas');
        canvas.width = starSize * ratio;
        canvas.height = starSize * ratio;

        var ctx = canvas.getContext('2d');
        ctx.scale(ratio, ratio);

        var outerRadius = starSize / 2,
            innerRadius = starSize / (starSize / 2),
            mediumRadius = starSize / 3 - 1;

        var cx = starSize / 2,
            cy = starSize / 2;

        var x = cx,
            y = cy;

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);

        var count = spikes;

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

    var Star = (function () {
        function Star(context, color, ratio, position) {
            babelHelpers.classCallCheck(this, Star);

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

        babelHelpers.createClass(Star, [{
            key: 'reDraw',
            value: function reDraw() {
                this.draw(this.pulsate());
            }
        }, {
            key: 'rePosition',
            value: function rePosition(position) {
                this.x = position.x;
                this.y = position.y;
            }
        }, {
            key: 'draw',
            value: function draw(scale) {

                var ctx = this.ctx;
                ctx.globalAlpha = scale;
                ctx.setTransform(this.ratio, 0, 0, this.ratio, 0, 0);
                ctx.translate(this.x, this.y);

                var size = starSize * scale;
                ctx.drawImage(star, -(size / 2), -(size / 2), size, size);
                ctx.globalAlpha = 1;
            }
        }, {
            key: 'pulsate',
            value: function pulsate() {
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
        }]);
        return Star;
    })();

    var limit = 25;
    var canvas = tag('canvas');
    var ctx = canvas.getContext('2d');
    var stars = [];
    var color = '#fff';
    var ratio = undefined;

    var _HTMLElement = function _HTMLElement() {};
    _HTMLElement.prototype = HTMLElement.prototype;

    var AmediaXmas = (function (_HTMLElement2) {
        babelHelpers.inherits(AmediaXmas, _HTMLElement2);

        function AmediaXmas() {
            babelHelpers.classCallCheck(this, AmediaXmas);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(AmediaXmas).apply(this, arguments));
        }

        babelHelpers.createClass(AmediaXmas, [{
            key: 'animate',
            value: function animate() {

                // request next frame
                var cb = this.animate.bind(this);
                requestAnimationFrame(cb);

                // clear canvas
                canvas.width = canvas.width;

                var i = limit;
                while (i > 0) {
                    i--;
                    stars[i].reDraw();
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

                // scale canvas to original size with css
                canvas.style.width = this.width + 'px';
                canvas.style.height = this.height + 'px';

                // increase context size for hidpi devices
                ctx.scale(ratio, ratio);

                this.appendChild(canvas);

                var i = limit;

                while (i > 0) {
                    i--;
                    stars.push(new Star(ctx, color, ratio, {
                        x: random(0, this.width),
                        y: random(0, this.height)
                    }));
                }

                this.animate();
            }
        }]);
        return AmediaXmas;
    })(_HTMLElement);

    document.registerElement('amedia-xmas', AmediaXmas);

}));