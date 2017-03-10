import React, { PropTypes } from 'react';
// import { Panel, Input, Button } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Finances.css';
import _ from 'lodash';
import history from '../../../core/history';
import Navigation from '../../../components/Navigation';
import Draggable from '../../../components/Draggable';

const title = 'Finances';

function Finances(props, context) {
  context.setTitle(title);
  return (
    <div>
      <Navigation />
      <Draggable />
    </div>
  );
}


Finances.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Finances);
