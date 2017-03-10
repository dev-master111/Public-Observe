import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './style.css';
import { Line, Circle, Scatter } from 'highcharts';

import classNames from 'classnames';
import ReactHighcharts from 'react-highcharts'; // Expects that Highcharts was loaded in the code.

import offset from './../global_consts'; // Offset from the title - Hard coded 45 px

import config from './config.js'


class AccousticCamera extends Component {
  constructor(props) {
    super(props);
    // config.chart.height = this.props.widgetState.h * this.props.rowHeight - offset;
    this.state = {
      config : config,
    }
  }
  // componentWillReceiveProps(nextProps) {
  //   config.chart.height = this.props.widgetState.h*this.props.rowHeight - offset;
  //   this.setState({
  //     config: config
  //   });
  // }
  render() {
    return (
      <ReactHighcharts config={this.state.config} ref="chart"></ReactHighcharts>
    );
  }
}
export default withStyles(s)(AccousticCamera);
