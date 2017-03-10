import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './style.css';
import history from '../../core/history';
import { Line, Circle } from 'rc-progress';
import ProgressBar from 'react-bootstrap';
import classNames from 'classnames';

import toDisplay from "./cut.mp4";
import {default as Video, Controls, Overlay} from 'react-html5video';

const colorMap = [  '#FE8C6A', '#3FC7FA', '#85D262',];

class CamVideoDashboard extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    var props = this.props.props,
        ProgressColour=colorMap[parseInt(props.percentagefed * 0.03, 10)],
        color = {color:props.color, float:"right"}
    return (
      <div key={props.id} className={s.panelColour}>
        <div className={classNames('row',s.xtitle)}>
          <div className="col-xs-8 col-sm-8"> <h4>Cage ID : {props.id}</h4> </div>
           <div className="col-xs-4 col-sm-4"><i className="fa fa-2x fa-dot-circle-o" style={color} aria-hidden="true"></i></div>
        </div>
        <div>
          <a href = '/live' >
            <Video autoPlay loop muted ref="video" className={s.main__video} >
                <source src={toDisplay} type="video/mp4" />
            </Video>
          </a>
        </div>
        <div><Line percent={props.percentagefed} strokeWidth={2} strokeColor={ProgressColour}/></div>
        <div className='row'>
          <div className="col-xs-4">Last Feed:<br/><strong className={s.textSize}>{props.lastFeed}</strong></div>
          <div className="col-xs-4">Next Feed:<br/><strong className={s.textSize}>{props.nextFeed}</strong></div>
          <div className="col-xs-4">Feed (%):<br/><strong className={s.textSize}>{props.percentagefed}%</strong></div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(CamVideoDashboard);
