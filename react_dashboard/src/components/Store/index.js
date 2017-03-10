import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import s          from './style.css';
import _          from 'lodash';

import {
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  ProgressBar,
} from 'react-bootstrap';

class Store extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modules: this.props.modules
    };
  };

  onClicker(moduleName){
    this.props.selectedItem( moduleName );
  };

  generateModules() {
    return this.state.modules.map( ( element, index ) => {
      return (
        <NavItem style={ {width: 300} } className={s.linkbar} key={index} onClick={()=>{this.onClicker(element.moduleName)}}>
          {element.moduleName}
          <i className="fa fa-eye" aria-hidden="true" style={{float:"right"}}></i>
          <i className="fa fa-cogs" aria-hidden="true" style={{float:"right",marginRight:"10px"}}></i>
        </NavItem>
        );
      });
  };

  render() {
    return (
      <div>
        <div style={{backgroundColor:"white"}}>
            <b>This is the modules store</b>
        </div>
        <Nav bsStyle="pills" stacked activeKey={1}>
          {this.generateModules()}
        </Nav>
      </div>
    );
  }
};

export default withStyles(s)(Store);
