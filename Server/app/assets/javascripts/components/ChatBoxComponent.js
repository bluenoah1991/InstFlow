import React, {Component, PropTypes, Children} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import _ from 'underscore';

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
                    bubbles.push(
                        <div key={index} className="bubble me">
                            {message.text}
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
                            <input type="text" />
                            <a href="javascript:;" className="write-link send"></a>
                            <a href="javascript:;" className="write-link smiley"></a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidUpdate(){
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
        $('.chat').slimScroll({
            height: '100%'
        });
    }

    componentWillUnmount(){
        window.clearTimeout(this.timeout);
    }
}

ChatBoxComponent.propTypes = {
    isFetching: PropTypes.bool,
    channelId: PropTypes.string,
    userClientId: PropTypes.string,
    conversationId: PropTypes.string,
    to: PropTypes.string,
    messages: PropTypes.array
}

const IsFetchingSelector = state => state.convs.isFetching;
const ChannelIdSelector = state => state.convs.channelId;
const UserClientIdSelector = state => state.convs.userClientId;
const ConversationIdSelector = state => state.convs.conversationId;
const ToSelector = state => state.convs.to;
const MessagesSelector = state => state.convs.messages;

function select(state, ownProps){
    return {
        isFetching: IsFetchingSelector(state),
        channelId: ChannelIdSelector(state, ownProps),
        userClientId: UserClientIdSelector(state),
        conversationId: ConversationIdSelector(state),
        to: ToSelector(state),
        messages: MessagesSelector(state)
    };
}

export default withRouter(connect(select)(ChatBoxComponent));
