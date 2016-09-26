"use strict";

export function intersperse(arr, sep){
    if(arr.length === 0){
        return [];
    }
    return arr.slice(1).reduce(function(xs, x, i){
        return xs.concat([sep, x]);
    }, [arr[0]]);
}

export function safestring(obj){
    if(obj == undefined){
        return '';
    } else {
        return obj;
    }
}