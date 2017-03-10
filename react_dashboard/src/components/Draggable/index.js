'use strict';
var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
import Sidebar    from 'react-sidebar';
import React      from 'react';
import _          from 'lodash';
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s          from './Draggable.css';
import classNames from 'classnames';
import $          from "jquery";

// Sellable components
import Sensor     from '../LiveTabComponents/Sensors';
import Weather    from '../LiveTabComponents/Weather';
import Camera     from '../LiveTabComponents/Camera';
import CommentLog from '../LogTabComponents/CommentLog'

const components = {
  Sensor    : Sensor,
  Weather   : Weather,
  Camera    : Camera,
  CommentLog: CommentLog
};

// TODO Theres some bug with adding and removing modules
// TODO Make the components object and import come from a file

var Draggable = React.createClass({
  mixins: [PureRenderMixin],

  getInitialState() {
    return {
      items: this.props.data,
      newCounter: this.props.data.length,
      end_x: this.props.data.reduce(function(a,b){return a + b.w},0),
      itemAdded: null,
    };
  },
// When the Store component is clicked, pass the item clicked to the pro
  componentWillReceiveProps(nextProps){
      if( nextProps.itemAdded !== this.state.itemAdded ){
        if( this.state.itemAdded !== null)
          this.onAddItem(nextProps.itemAdded);
        this.state.itemAdded = nextProps.itemAdded;
      }
  },

  createElement(el) {
    var removeStyle = {position: 'absolute',right: '5px',top: '5px',cursor: 'pointer'};
    var percent = {width:"100%",height:'100%', marginBottom:'45px'};
    var props = this.props, state = this.state;
    const CustomComponent = components[el.componentName];
    return (
      <div key={el.i} data-grid={el} className={s.panelColour}>
        <div className={s.full}>
        <div className={classNames('row',s.xtitle)}>
          <div className="col-xs-11"> <h4>{el.componentName}</h4> </div>
           <div><i className="fa fa-window-close" aria-hidden="true" style={removeStyle} onClick={this.onRemoveItem.bind(this, el.i)}></i></div>
        </div>
        <div>
          <CustomComponent {...el.props} {...props} widgetState={this.state.items[el.i]} />
        </div>
        </div>
      </div>
    );
  },

  onAddItem( element ) {
    this.setState({
      items: this.state.items.concat({
        i: this.state.newCounter.toString(),
        x: 0,
        y: Infinity, // puts it at the bottom
        w: element.w,
        h: element.h,
        minW: (element.minW || 4 ),
        minH: (element.minH || 3 ),
        props: element.props,
        componentName: element.componentName,
      }),
      end_x : this.state.end_x + element.w,
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1
    });
  },

  onRemoveItem(i) {
    // Actually need to go in and call destroy on the fucking component.
    this.setState({items: _.reject(this.state.items, {i: i})});
  },
  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  },

  onResize( grid, gridItem ){
    // Need to do all this crap to make it resize while keeping dynamic props
    let currentState = this.state.items;
    let index = currentState.findIndex(( element ) => {
      return toString(element.i) === toString(gridItem.i);
    });
    let updatedVar = currentState[index];
    Object.keys(gridItem).forEach(function(objectKey) {
        if( typeof currentState[index][objectKey] !== 'undefined'
            && currentState[index][objectKey] !== grid[index][objectKey] ){
          updatedVar[objectKey] = gridItem[objectKey];
        }
    });
    grid = grid.map((el,i)=>{
      Object.keys(currentState[i]).forEach(function(objectKey) {
          if( typeof el[objectKey] === 'undefined'){
            el[objectKey] = currentState[i][objectKey];
          }
      });
      return el;
    });
    this.setState({
      items: grid
    });
  },

  render() {
    return (
      <div>
          <button onClick={()=>{this.props.openTab()}}>Open Store</button>
          <ResponsiveReactGridLayout onLayoutChange={this.onLayoutChange} onBreakpointChange={this.onBreakpointChange}
            onResize={this.onResize} onResizeStop={this.onResizeStop} onResizeStart={this.onResizeStart}
              {...this.props}>
            {_.map(this.state.items, this.createElement)}
          </ResponsiveReactGridLayout>
      </div>
    );
  }
});

Draggable.defaultProps = {
  className: "layout",
  cols: {lg: 12, md: 8, sm: 4, xs: 4, xxs: 4},
  rowHeight: 100,
};

export default withStyles(s)(Draggable);
