import React, {Component, PropTypes, Children} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import _ from 'underscore';

import * as Actions from '../actions';
import {safestring} from '../utils';

class ChatBoxComponent extends Component{
    constructor(){
        super();
        this.state = {
            id: _.uniqueId('chatbox_')
        };
    }
    
    render(){
        let to = this.props.to != undefined ? this.props.to : 'Unknown';
        let messages = this.props.messages != undefined ? this.props.messages : [];
        let bubbles = [];
        messages.forEach(function(message, index){
            if(message.ext_type == 'start'){
                bubbles.push(
                    <div key={index} className="conversation-start">
                        <span>{message.time}</span>
                    </div>
                );
            } else if(message.ext_type == 'message'){
                if(message.orientation == 1){
                    bubbles.push(
                        <div key={index} className="bubble you">
                            {message.text}
                        </div>
                    );
                } else if(message.orientation == 2){
                    let state = null;
                    if(message.state == 'pending' || message.state == 'sending'){
                        state = <i className="fa fa-spinner fa-spin"></i>; 
                    } else if(message.state == 'failed'){
                        state = <i className="fa fa-exclamation"></i>;
                    }
                    bubbles.push(
                        <div key={index} className="bubble me">
                            {state} {message.text}
                        </div>
                    );
                }
            } else if(message.ext_type == 'close'){
                bubbles.push(
                    <div key={index} className="bubble you">
                        <i className="fa fa-sign-out"></i>
                    </div>
                );
            }
        });

        return (
            <div id={this.state.id} className="chat-wrapper">
                <div className="chat-container">
                    <div className="full">
                        <div className="top"><span>To: <span className="name">{to}</span></span>
                        </div>
                        <div className="chatbox">
                            <div className="chat">
                                {bubbles}
                            </div>
                        </div>
                        <div className="write">
                            <a href="javascript:;" className="write-link attach"></a>
                            <input type="text" value={safestring(this.props.write)}  onChange={this.handleChange.bind(this)} />
                            <a href="javascript:;" className="write-link send" onClick={this.handleSend.bind(this)}></a>
                            <a href="javascript:;" className="write-link smiley"></a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidUpdate(){
        // $('.chat').slimScroll({
        //     scrollTo: $('.chat')[0].scrollHeight
        // });
        
        // Block UI
        if((this.props.isFetching != undefined && this.props.isFetching) ||
            (this.props.pwdIsFetching != undefined && this.props.pwdIsFetching)){
            App.blockUI({
                target: `#${this.state.id}`,
                animate: true
            });
            this.timeout = window.setTimeout(function() {
                App.unblockUI(`#${this.state.id}`);
            }.bind(this), 5000);
        } else {
            App.unblockUI(`#${this.state.id}`);
        }
    }

    componentDidMount(){
        let channel_id = this.props.user.channel_id;
        if(channel_id == undefined){ return; }
        let user_client_id = this.props.user.user_client_id;
        if(user_client_id == undefined){ return; }
        let user_client_name = this.props.user.user_client_name;
        this.props.dispatch(Actions.ConvsActions.fetchRecentConvs(
            channel_id, user_client_id, user_client_name, function(){
                $('.chat').slimScroll({
                    height: '100%',
                    start: 'bottom'
                });
            }));
    }

    componentWillUnmount(){
        window.clearTimeout(this.timeout);
    }

    handleSend(){
        this.props.dispatch(Actions.ConvsActions.sendNlMessage(function(){
            $('.chat').slimScroll({
                scrollTo: $('.chat')[0].scrollHeight
            });
        }));
    }

    handleChange(e){
        this.props.dispatch(Actions.ConvsActions.changeNlMessageInput(e.target.value));
    }
}

ChatBoxComponent.propTypes = {
    user: PropTypes.object,
    isFetching: PropTypes.bool,
    channelId: PropTypes.string,
    userClientId: PropTypes.string,
    conversationId: PropTypes.string,
    to: PropTypes.string,
    messages: PropTypes.array,
    write: PropTypes.string
}

const IsFetchingSelector = state => state.convs.isFetching;
const ChannelIdSelector = state => state.convs.channelId;
const UserClientIdSelector = state => state.convs.userClientId;
const ConversationIdSelector = state => state.convs.conversationId;
const ToSelector = state => state.convs.to;
const MessagesSelector = state => state.convs.messages;
const WriteSelector = state => state.convs.write;

function select(state, ownProps){
    return {
        isFetching: IsFetchingSelector(state),
        channelId: ChannelIdSelector(state, ownProps),
        userClientId: UserClientIdSelector(state),
        conversationId: ConversationIdSelector(state),
        to: ToSelector(state),
        messages: MessagesSelector(state),
        write: WriteSelector(state)
    };
}

export default withRouter(connect(select)(ChatBoxComponent));
