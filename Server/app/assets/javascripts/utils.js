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

export function csrfToken(){
    return $('meta[name=csrf-token]').attr('content');
}

export function meta(name){
    return $(`meta[name=${name}]`).attr('content');
}

export function request(url, method = 'GET', data, headers){
    let h = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    if(headers != undefined){
        h = Object.assign({}, h, headers);
    }
    let m = method.toUpperCase();
    if(m == 'GET'){
        return fetch(url, {
            method: m,
            headers: h,
            credentials: 'same-origin'
        });
    } else {
        let d = data != undefined ? data : {};
        let dataHasAuthToken = Object.assign({}, d, {
            authenticity_token: csrfToken()
        });
        return fetch(url, {
            method: m,
            headers: h,
            credentials: 'same-origin',
            body: JSON.stringify(dataHasAuthToken)
        });
    }
}

export function get(url, data, headers){
    return request(url, 'get', data, headers);
}

export function post(url, data, headers){
    return request(url, 'post', data, headers);
}

export function put(url, data, headers){
    return request(url, 'put', data, headers);
}

export function del(url, data, headers){
    return request(url, 'delete', data, headers);
}