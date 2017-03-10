import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  MenuItem,
  DropdownButton,
  Panel, PageHeader, ListGroup, ListGroupItem, Button,
} from 'react-bootstrap';

import s from './Home.css';
import CamVideoDashboard from '../../components/CamVideoDashboard';
import Navigation from '../../components/Navigation'

const title = 'Observe';


const cages = [1,2,3,4,5,6,7,8].map(function(element, index, arry){
  return { id: index,
    lastFeed:"0"+element+":"+parseInt(Math.random()*59,10),
    nextFeed:"1"+element+":"+parseInt(Math.random()*59,10),
    percentagefed:parseInt(Math.random() * 100, 10),
    color:(Math.random() > 0.85) ?'red':'green'}
});


function Home(props, context) {
  var noPad = {
   padding: 0,
   margin: 0
  }
  context.setTitle(title);
  function generateVideos() {
    return cages.map( function( element, index ) {
        return (
          <div key={index.toString()} className="col-lg-3 col-md-4 col-sm-6" style={noPad}>
              <CamVideoDashboard props={element}/>
          </div>)
    });
  }
  return (
    <div>
      <Navigation />
      <div className="row">
        {generateVideos()}
      </div>
    </div>
  );

}

Home.propTypes = {
  // news: PropTypes.arrayOf(PropTypes.shape({
  //   title: PropTypes.string.isRequired,
  //   link: PropTypes.string.isRequired,
  //   contentSnippet: PropTypes.string,
  // })).isRequired,
};
Home.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Home);
