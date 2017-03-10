import React, { PropTypes } from 'react';
// import { Panel, Input, Button } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s          from './Live.css';
import Sidebar    from 'react-sidebar';

import Navigation from '../../../components/Navigation';
import Draggable  from '../../../components/Draggable';

import Store      from '../../../components/Store';

const title = 'Live';

var StoreDB = [
  {moduleName: 'Sensor', id: 1},
  {moduleName: 'Camera', id: 2},
  {moduleName: 'Accoustic Camera', id: 3},
  {moduleName: 'Weather', id: 4},
];
var x = new Date();
var weather_data = {date: x.getUTCDay(),
    RainChance: 4,
    Temp: 53,
    tide: 23,
    weather: "Cloudy",
    weather_3:["fa fa-cloud",
                "fa fa-tint",
                "fa fa-sun-o"
                ]};
var data = [
  { i: '0', x: 0, y: 0, w: 6, h: 3, minW: 4, minH: 3, componentName:"Sensor", props:{weather_data:weather_data} },
  { i: '1', x: 6, y: 0, w: 6, h: 3, minW: 4, minH: 3, componentName:"Weather", props:{weather_data:weather_data} },
  { i: '2', x: 0, y: 0, w: 6, h: 3, minW: 4, minH: 3, componentName:"Camera", props:{weather_data:weather_data} }
];

var SideBarWrapper = React.createClass({

  getInitialState() {
    return {
      docked: false,
      open: false,
      transitions: true,
      touch: true,
      shadow: true,
      pullRight: false,
      touchHandleWidth: 20,
      dragToggleDistance: 30,
    };
  },

  onSetOpen() {
    this.setState({open: !this.state.open});
  },

  itemSelected( elementId ){
    this.setState({
      open:!this.state.open,
      itemAdded:   { i: '0', x: 0, y: 0, w: 6, h: 3, minW: 4, minH: 3,
                    componentName:elementId, props:{weather_data:weather_data} },

    });
  },

  render() {
    const sidebar = <Store modules={this.props.modules} selectedItem={this.itemSelected}/>

    const StoreProps = {
      sidebar: sidebar,
      docked: this.state.docked,
      sidebarClassName: 'custom-sidebar-class',
      open: this.state.open,
      touch: this.state.touch,
      shadow: this.state.shadow,
      pullRight: this.state.pullRight,
      touchHandleWidth: this.state.touchHandleWidth,
      dragToggleDistance: this.state.dragToggleDistance,
      transitions: this.state.transitions,
      onSetOpen: this.onSetOpen,
    };

    return (
    <Sidebar {...StoreProps}>
      <Navigation />
      <Draggable ref="draggable" data={data} openTab={this.onSetOpen} itemAdded={this.state.itemAdded}/>
    </Sidebar>
    );
  },
});































function Live(props, context) {
  context.setTitle(title);

  return (
    <div>
      <SideBarWrapper modules={StoreDB} />
    </div>
  );
}


Live.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Live);
