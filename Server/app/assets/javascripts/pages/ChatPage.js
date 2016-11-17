import React, {Component, PropTypes} from 'react';

import {RowComponent, ColComponent, PortletComponent} from '../components/LayoutComponent';
import {NoteComponent} from '../components/NoteComponent';
import PageBreadCrumbComponent from '../components/PageBreadCrumbComponent';
import PageContentComponent from '../components/PageContentComponent';
import PageHeadComponent from '../components/PageHeadComponent';

class ConstructionPage extends Component{
    render(){
        return (
            <PageContentComponent>
                <RowComponent>
                    <ColComponent size="12">
                        <PortletComponent title="Chat Window">
                            <div className="chat-wrapper">
                                <div className="chat-container">
                                    <div className="left">
                                        <div className="top">
                                            <input type="text" />
                                            <a href="javascript:;" className="search"></a>
                                        </div>
                                        <div className="list">
                                            <ul className="people">
                                                <li className="person" data-chat="person1">
                                                    <span className="name">Thomas Bangalter</span>
                                                    <span className="time">2:09 PM</span>
                                                    <span className="preview">I was wondering...</span>
                                                </li>
                                                <li className="person" data-chat="person2">
                                                    <span className="name">Dog Woofson</span>
                                                    <span className="time">1:44 PM</span>
                                                    <span className="preview">I've forgotten how it felt before</span>
                                                </li>
                                                <li className="person" data-chat="person3">
                                                    <span className="name">Louis CK</span>
                                                    <span className="time">2:09 PM</span>
                                                    <span className="preview">But we’re probably gonna need a new carpet.</span>
                                                </li>
                                                <li className="person" data-chat="person4">
                                                    <span className="name">Bo Jackson</span>
                                                    <span className="time">2:09 PM</span>
                                                    <span className="preview">It’s not that bad...</span>
                                                </li>
                                                <li className="person" data-chat="person2">
                                                    <span className="name">Dog Woofson</span>
                                                    <span className="time">1:44 PM</span>
                                                    <span className="preview">I've forgotten how it felt before</span>
                                                </li>
                                                <li className="person" data-chat="person3">
                                                    <span className="name">Louis CK</span>
                                                    <span className="time">2:09 PM</span>
                                                    <span className="preview">But we’re probably gonna need a new carpet.</span>
                                                </li>
                                                <li className="person" data-chat="person4">
                                                    <span className="name">Bo Jackson</span>
                                                    <span className="time">2:09 PM</span>
                                                    <span className="preview">It’s not that bad...</span>
                                                </li>
                                                <li className="person" data-chat="person2">
                                                    <span className="name">Dog Woofson</span>
                                                    <span className="time">1:44 PM</span>
                                                    <span className="preview">I've forgotten how it felt before</span>
                                                </li>
                                                <li className="person" data-chat="person3">
                                                    <span className="name">Louis CK</span>
                                                    <span className="time">2:09 PM</span>
                                                    <span className="preview">But we’re probably gonna need a new carpet.</span>
                                                </li>
                                                <li className="person" data-chat="person4">
                                                    <span className="name">Bo Jackson</span>
                                                    <span className="time">2:09 PM</span>
                                                    <span className="preview">It’s not that bad...</span>
                                                </li>
                                                <li className="person" data-chat="person5">
                                                    <span className="name">Michael Jordan</span>
                                                    <span className="time">2:09 PM</span>
                                                    <span className="preview">Wasup for the third time like is you bling bitch</span>
                                                </li>
                                                <li className="person" data-chat="person6">
                                                    <span className="name">Drake</span>
                                                    <span className="time">2:09 PM</span>
                                                    <span className="preview">howdoyoudoaspace</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <div className="top"><span>To: <span className="name">Dog Woofson</span></span>
                                        </div>
                                        <div className="chatbox">
                                            <div className="chat">
                                                <div className="conversation-start">
                                                    <span>Today, 6:48 AM</span>
                                                </div>
                                                <div className="bubble you">
                                                    Hello,
                                                </div>
                                                <div className="bubble you">
                                                    it's me.
                                                </div>
                                                <div className="bubble you">
                                                    I was wondering...
                                                </div>
                                                <div className="conversation-start">
                                                    <span>Today, 5:38 PM</span>
                                                </div>
                                                <div className="bubble you">
                                                    Hello, can you hear me?
                                                </div>
                                                <div className="bubble you">
                                                    I'm in California dreaming
                                                </div>
                                                <div className="bubble me">
                                                    ... about who we used to be.
                                                </div>
                                                <div className="bubble me">
                                                    Are you serious?
                                                </div>
                                                <div className="bubble you">
                                                    When we were younger and free...
                                                </div>
                                                <div className="bubble you">
                                                    I've forgotten how it felt before
                                                </div>
                                                <div className="conversation-start">
                                                    <span>Today, 3:38 AM</span>
                                                </div>
                                                <div className="bubble you">
                                                    Hey human!
                                                </div>
                                                <div className="bubble you">
                                                    Umm... Someone took a shit in the hallway.
                                                </div>
                                                <div className="bubble me">
                                                    ... what.
                                                </div>
                                                <div className="bubble me">
                                                    Are you serious?
                                                </div>
                                                <div className="bubble you">
                                                    I mean...
                                                </div>
                                                <div className="bubble you">
                                                    It’s not that bad...
                                                </div>
                                                <div className="bubble you">
                                                    But we’re probably gonna need a new carpet.
                                                </div>
                                                <div className="conversation-start">
                                                    <span>Yesterday, 4:20 PM</span>
                                                </div>
                                                <div className="bubble me">
                                                    Hey human!
                                                </div>
                                                <div className="bubble me">
                                                    Umm... Someone took a shit in the hallway.
                                                </div>
                                                <div className="bubble you">
                                                    ... what.
                                                </div>
                                                <div className="bubble you">
                                                    Are you serious?
                                                </div>
                                                <div className="bubble me">
                                                    I mean...
                                                </div>
                                                <div className="bubble me">
                                                    It’s not that bad...
                                                </div>
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
                        </PortletComponent>
                    </ColComponent>
                </RowComponent>
            </PageContentComponent>
        );
    }

    componentDidMount(){
        $('.left .person').eq(0).addClass('active');

        $('.left .person').mousedown(function(){
            if ($(this).hasClass('.active')) {
                return false;
            } else {
                $('.left .person').removeClass('active');
                $(this).addClass('active');
            }
        });

        $('.people').slimScroll({
            height: '100%'
        });

        $('.chat').slimScroll({
            height: '100%'
        });
    }
}

export default ConstructionPage;