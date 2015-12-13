'use strict';

export default function(min, max) {
    min = min * 100;
    max = max * 100;
    return ((Math.random() * ( max - min + 1 )) + min)/100;
}
