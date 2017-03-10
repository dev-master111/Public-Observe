import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Weather.css';
import classNames from 'classnames';


class Weather extends Component {


  constructor(props) {
    super(props);
    this.state = {
      weather_data : props.weather_data
    }
  }



  render() {
    var x = new Date();
    var days= ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    return (
          <div className={classNames(s.panel,s["panel-box"],s.panelColour)}>
            <div className="row">
                <div className={classNames(s["panel-middle"],s["size-h1"],"col-xs-4")}>
                    <i className={this.state.weather_data.weather_3[0]}></i>
                </div>
                <div className={classNames(s["panel-top"],"col-xs-8")}>
                    <div className={s["text-left"]}>
                        <p><strong>{this.state.weather_data.weather}</strong> <small>(<strong>{this.state.weather_data.RainChance}<span>&#37;</span></strong> chance of rain)</small></p>
                        <p>Temperature: <strong>{this.state.weather_data.Temp}<span>&#8451;</span></strong></p>
                        <p>Tide:<strong> {this.state.weather_data.tide}</strong></p>
                    </div>
                    <div className={classNames(s.divider,s["divider-sm"])}></div>
                </div>
            </div>
                <div className={classNames(s["panel-bottom"])}>
                    <ul className={classNames(s["list-justified"], s["text-center"])}>
                        <li>
                            <p className={classNames(s["size-h2"], s["color-info"])}><i className={this.state.weather_data.weather_3[2]}></i></p>
                            <p className={s["text-muted"]}>{days[(this.state.weather_data.date ) % (days.length)]}</p>
                        </li>
                        <li>
                            <p className={classNames(s["size-h2"],s["color-success"])}><i className={this.state.weather_data.weather_3[1]}></i></p>
                            <p className={classNames(s["text-muted"])}>{days[(this.state.weather_data.date+1) % (days.length)]}</p>
                        </li>
                        <li>
                            <p className={classNames(s["size-h2"], s["color-infoAlt"])}><i className={this.state.weather_data.weather_3[2]}></i></p>
                            <p className={s["text-muted"]}>{days[(this.state.weather_data.date+2) % (days.length)]}</p>
                        </li>
                    </ul>
                </div>
            </div>
    );
  }
}

export default withStyles(s)(Weather);
