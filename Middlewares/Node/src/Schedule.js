"use strict";

import async from 'async';
import Schedule_ from 'node-schedule';
import { UserModel, MessageModel, NLMessageModel } from './models';
import { CommonSerializer, IdentitySerializer } from './Serializer';
import HttpProxy from './HttpProxy';

class Schedule {
    constructor() {
        this.httpProxy = new HttpProxy();
        let interval = process.env.SYNC_INTERVAL || 5;
        this.rule = `*/${interval} * * * *`;
        this.syncJob = Schedule_.scheduleJob(this.rule, this.sync.bind(this));
    }

    syncOutgoing() {

    }

    syncModel(model, resourcePath, conditions) {
        let where = { __sync__: false, __tries__: { $lt: 3 } };
        if (conditions != undefined) {
            Object.assign(where, conditions);
        }
        return model.findAll({ where: where }).then(function (instances) {
            return new Promise(function (resolve, reject) {
                async.each(instances, function (instance, callback) {
                    instance.increment('__tries__').then(function () {
                        this.httpProxy.post(resourcePath, CommonSerializer(instance));
                        callback();
                    }.bind(this));
                }.bind(this), function (err) {
                    resolve(err);
                });
            }.bind(this));
        }.bind(this)).catch(function(err){
            console.log(err);
        });
    }

    sync() {
        Promise.all([
            this.syncModel(UserModel, '/api/v1/users'),
            this.syncModel(MessageModel, '/api/v1/messages'),
            this.syncModel(NLMessageModel, '/api/v1/nlmsg/incoming', { orientation: 1 })
        ]).then(function () {
            if (this.httpProxy.hasCache()) {
                this.httpProxy.flush(function (err, data, resp, req) {
                    if (err) {
                        console.log(err);
                    } else {
                        if (req.method == 'post' && req.url == '/api/v1/users') {
                            UserModel.update({ __sync__: true }, {
                                where: IdentitySerializer(data, ['channel_id', 'user_id'])
                            });
                        } else if (req.method == 'post' && req.url == '/api/v1/messages') {
                            MessageModel.update({ __sync__: true }, {
                                where: IdentitySerializer(data, ['msg_id'])
                            });
                        } else if (req.method == 'post' && req.url == '/api/v1/nlmsg/incoming') {
                            NLMessageModel.update({ __sync__: true }, {
                                where: IdentitySerializer(data, ['msg_id'])
                            });
                        }
                    }
                });
            }
        }.bind(this)).catch(function(err){
            console.log(err);
        });
    }

    saveUser(
        serviceUrl, bot_client_id, bot_client_name,
        user_client_id, user_client_name, channel_id, extra) {
        return UserModel.findOrCreate({
            where: {
                channel_id: channel_id,
                user_client_id: user_client_id
            },
            defaults: {
                serviceUrl: serviceUrl,
                bot_client_id: bot_client_id,
                bot_client_name: bot_client_name,
                user_client_name: user_client_name,
                extra: extra
            }
        }).spread(function (instance, created) {
            console.log(instance.get({ plain: true }));
            return created;
        });
    }

    saveMessage(
        msg_id, msg_type, text, source, agent, serviceUrl,
        user_client_id, user_client_name, bot_client_id,
        bot_client_name, channel_id, conversation_id, orientation, time) {
        return MessageModel.create({
            msg_id: msg_id,
            msg_type: msg_type,
            text: text,
            source: source,
            agent: agent,
            serviceUrl: serviceUrl,
            user_client_id: user_client_id,
            user_client_name: user_client_name,
            bot_client_id: bot_client_id,
            bot_client_name: bot_client_name,
            channel_id: channel_id,
            conversation_id: conversation_id,
            orientation: orientation,
            time: time
        }).then(function (instance) {
            let instance_ = instance.get({ plain: true });
            console.log(instance_.text);
            return instance_;
        });
    }

    saveNLMessage(
        ext_type, msg_id, msg_type, text, source, agent, serviceUrl,
        user_client_id, user_client_name, bot_client_id,
        bot_client_name, channel_id, conversation_id, orientation, time) {
        return NLMessageModel.create({
            ext_type: ext_type,
            msg_id: msg_id,
            msg_type: msg_type,
            text: text,
            source: source,
            agent: agent,
            serviceUrl: serviceUrl,
            user_client_id: user_client_id,
            user_client_name: user_client_name,
            bot_client_id: bot_client_id,
            bot_client_name: bot_client_name,
            channel_id: channel_id,
            conversation_id: conversation_id,
            orientation: orientation,
            time: time
        }).then(function (instance) {
            let instance_ = instance.get({ plain: true });
            console.log(instance_.text);
            return instance_;
        });
    }
}

export default new Schedule();