import React, { PropTypes } from 'react';
// import { Panel, Input, Button } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Logs.css';
import _ from 'lodash';
import history from '../../../core/history';
import Navigation from '../../../components/Navigation';
import Draggable from '../../../components/Draggable';

const title = 'Logs';

function Logs(props, context) {
  context.setTitle(title);
  return (
    <div>
      <Navigation />
      <Draggable />
    </div>
  );
}


Logs.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Logs);
