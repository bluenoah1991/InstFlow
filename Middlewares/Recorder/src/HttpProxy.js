"use strict";

import clone from 'clone';
import restify from 'restify';

const tt = {
    "ops": [],
    "sequential": true
}

export default class HttpProxy{
    constructor(){
        this.createNewReq();
        this.auth_token = `Token token=${process.env.SERVICE_AUTH_TOKEN}`;
        this.httpclient = restify.createJsonClient({
            url: process.env.SERVICE_BASE_URL || 'https://example.instflow.com/',
            version: '*',
            headers: {
                'Authorization': this.auth_token
            }
        });
        this.defaultPath = process.env.SERVICE_DEFAULT_PATH || '/api/v1/batch';
        this.defaultMethod = process.env.SERVICE_DEFAULT_METHOD || 'post';
    }

    createNewReq(){
        this.req = clone(tt);
    }

    http(method, url, params={}, headers={}){
        this.req.ops.push({
            method: method,
            url: url,
            params: params,
            headers: headers
        });
    }

    get(url, params={}, headers={}){
        this.http('get', url, params, headers);
    }

    post(url, params={}, headers={}){
        this.http('post', url, params, headers);
    }

    put(url, params={}, headers={}){
        this.http('put', url, params, headers);
    }

    patch(url, params={}, headers={}){
        this.http('patch', url, params, headers);
    }

    delete(url, params={}, headers={}){
        this.http('delete', url, params, headers);
    }

    hasCache(){
        return this.req.ops.length > 0;
    }

    flush(callback){
        let req = this.req;
        this.createNewReq();
        var m = this.httpclient[this.defaultMethod];
        if(typeof m == 'function'){
            m = m.bind(this.httpclient);
            m(this.defaultPath, req, function(err, req, res, obj){
                if(err){
                    console.log(err);
                } else {
                    let results = obj.results;
                    results.forEach(function(resp, index){
                        let status = resp.status;
                        let data = resp.body;
                        let err = data.error;
                        callback(err, data, resp);
                    });
                }
                // Ignore response
            });
        } else {
            throw "Invalid HTTP verb, must be one of: get, post, put, patch, del.";
        }
    }
}
