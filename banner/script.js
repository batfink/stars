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
    var banner = svgtag('svg');

    var _HTMLElement = function _HTMLElement() {};
    _HTMLElement.prototype = HTMLElement.prototype;

    var AmediaXmasSVG = (function (_HTMLElement2) {
        babelHelpers.inherits(AmediaXmasSVG, _HTMLElement2);

        function AmediaXmasSVG() {
            babelHelpers.classCallCheck(this, AmediaXmasSVG);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(AmediaXmasSVG).apply(this, arguments));
        }

        babelHelpers.createClass(AmediaXmasSVG, [{
            key: 'rand',
            value: function rand(mult) {
                return Math.random() * mult;
            }
        }, {
            key: 'newStar',
            value: function newStar() {
                var star = svgtag('svg');
                var use = svgtag('use');

                // star.setAttribute('width', 21);
                // star.setAttribute('height', 21);

                star.setAttribute('class', 'star');
                star.style.webkitAnimationDelay = this.rand(5) + "s";
                star.style.animationDelay = this.rand(5) + "s";

                use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#star');
                use.setAttribute('fill', this.getAttribute('star-color'));

                use.style.webkitTranform = 'scale(' + this.rand(0.25) + ')';
                use.style.transform = 'scale(' + this.rand(0.25) + ')';

                star.appendChild(use);
                return star;
            }
        }, {
            key: 'start',
            value: function start() {
                var i = limit;
                while (i > 0) {
                    var star = this.newStar();
                    star.setAttribute('x', this.width * this.rand(1));
                    star.setAttribute('y', this.height * this.rand(1));
                    banner.appendChild(star);
                    i--;
                }
            }
        }, {
            key: 'createdCallback',
            value: function createdCallback() {

                this.width = this.offsetWidth;
                this.height = this.offsetHeight;

                banner.setAttribute('viewBox', '0 0 ' + this.width + ' ' + this.height);
                banner.setAttribute('version', '1.1');
                banner.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                banner.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');

                this.appendChild(banner);

                var star = svgtag('symbol');
                star.setAttribute('viewBox', '0 0 21 21');
                star.id = 'star';

                var cross = svgtag('symbol');
                cross.setAttribute('viewBox', '0 0 21 21');
                cross.id = 'cross';

                var path = svgtag('path');
                path.setAttribute('d', 'M0,10 L9.45,9.45 L10,0 L10.55,9.45 L20,10 L10.55,10.55 L10,20 L9.45,10.55 Z');
                cross.appendChild(path);

                var crossBig = svgtag('use');
                crossBig.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#cross');

                var crossSmall = svgtag('use');
                crossSmall.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#cross');
                crossSmall.setAttribute('transform', 'scale(0.7) translate(4.285,4.285) rotate(45 10 10)');

                star.appendChild(crossBig);
                star.appendChild(crossSmall);

                banner.appendChild(cross);
                banner.appendChild(star);

                this.start();
            }
        }]);
        return AmediaXmasSVG;
    })(_HTMLElement);

    document.registerElement('amedia-xmas-svg', AmediaXmasSVG);

}));