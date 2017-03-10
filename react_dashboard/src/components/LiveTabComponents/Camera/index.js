import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './style.css';
import classNames from 'classnames';

import {default as Video, Controls, Overlay} from 'react-html5video';
import toDisplay from './cut.mp4';

import offset from './../global_consts'; // Offset from the title - Hard coded 45 px

class Camera extends Component {

  constructor(props) {
    super(props);
  }



  render() {
    var withOffset = {
      paddingBottom: offset,
      height:"100%",
      width:"100%"
    }
    return (
      <div style={withOffset}>
        <Video autoPlay loop muted ref="video" className={s.main__video}>
            <source src={toDisplay} type="video/mp4" />
        </Video>
      </div>

    );
  }
}

export default withStyles(s)(Camera);
