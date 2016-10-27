"use strict";

import _ from 'underscore';

export function CommonSerializer(instance){
    let instance_ = instance;
    if(typeof instance_['get'] == 'function'){
        instance_ = instance_.get();
    }
    return _.omit(instance_, [
        'id', '__sync__', '__tries__', 
        'createAt', 'updatedAt'
        ]);
}

export function IdentitySerializer(instance, identities){
    let instance_ = instance;
    if(typeof instance_['get'] == 'function'){
        instance_ = instance_.get();
    }
    return _.pick(instance_, identities);
}