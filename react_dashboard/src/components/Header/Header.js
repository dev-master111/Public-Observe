/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  ProgressBar,
} from 'react-bootstrap';
import Navbar, {Brand} from 'react-bootstrap/lib/Navbar';
import history from '../../core/history';
import $ from "jquery";

const logo = require('./observelogo.png');

const NavBarData = {
  messages : [{cageid: 1, timeAlerted: new Date("02/10/2017")}],
  // Progressbar =[success(green),info(blue),warning(yellow),danger(red)]
  cageStatus : [{cageid: 1, percentagefed:80, lastFeed:"12:12", nextFeed:"4:16" , cagestatus: "success"},
                {cageid: 2, percentagefed:25, lastFeed:"11:11", nextFeed:"13:40", cagestatus: "warning"},
                {cageid: 3, percentagefed:50, lastFeed:"8:59",  nextFeed:"14:13", cagestatus: "success"},
                {cageid: 4, percentagefed:8, lastFeed:"7:30",   nextFeed:"17:35", cagestatus: "danger"}
              ]
}

function Header() {
  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}
  function renderCageStatus() {
    let cages = NavBarData.cageStatus;
    return cages.map( function( element, index ) {
        return (
        <MenuItem style={ {width: 200} } eventKey={index} key={index}>
          <div>
            <p> <strong>Cage {element.cageid}</strong> <span className="pull-right text-muted">{element.percentagefed}% Complete</span> </p>
            <div>
              <ProgressBar  bsStyle={element.cagestatus} now={element.percentagefed} />
            </div>
          </div>
        </MenuItem>)
      });
  };
  function renderMessagesStatus() {
    let messages = NavBarData.messages, toRet = [];
    messages.forEach( function( element, index ) {
      toRet.push(
        <MenuItem style={ {width: 300} } eventKey={index} key={index}>
          <div> <strong>Cage {element.cageid}</strong> <span className="pull-right text-muted"> <em>{timeSince(element.timeAlerted)} ago</em> </span> </div>
          <div>Cage alert!</div>
        </MenuItem>
        );
      toRet.push(<MenuItem key={index+messages.length} divider />);
      });
      toRet.pop(); return toRet;
  };
  return (
    <div id="wrapper" className="content">
      <Navbar fluid={true}  style={ {margin: 0} }>
          <Brand>
            <span>
              <img src={logo} alt="Start React" title="Start React" />
                <button type="button" className="navbar-toggle" onClick={() => {toggleMenu();}} style={{position: 'absolute', right: 0, top: 0}}>
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
            </span>
          </Brand>
          <ul className="nav navbar-top-links navbar-right">
            <NavDropdown bsClass="dropdown" title={<span><i className="fa fa-envelope fa-fw"></i></span>} id="navDropdown1">
              {renderMessagesStatus()}
            </NavDropdown>

             <NavDropdown title={<span><i className="fa fa-tasks fa-fw"></i> </span>} id = 'navDropdown2222'>
              {renderCageStatus()}
            </NavDropdown>

           <NavDropdown title={<i className="fa fa-user fa-fw"></i> } id = 'navDropdown4'>
                  <MenuItem eventKey="1">
                    <span> <i className="fa fa-user fa-fw"></i> User Profile </span>
                  </MenuItem>
                  <MenuItem eventKey="2">
                    <span><i className="fa fa-gear fa-fw"></i> Settings </span>
                  </MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey = "4" onClick = {(event) => { history.push('/login');}}>
                    <span> <i className = "fa fa-sign-out fa-fw" /> Logout </span>
                  </MenuItem>
                </NavDropdown>
          </ul>
          <ul className="nav navbar-nav navbar-left collapse navbar-collapse">
            <li className="active"><a href="#">Dashboard</a></li>
            <li><a href="#">Live</a></li>
            <li><a href="#">Finances</a></li>
            <li><a href="#">Logs</a></li>
          </ul>
    </Navbar>
    </div>
  );
}
function toggleMenu(){
    if($(".navbar-collapse").hasClass('collapse')){
      $(".navbar-collapse").removeClass('collapse');
    }
    else{
      $(".navbar-collapse").addClass('collapse');
    }
  }

export default Header;
