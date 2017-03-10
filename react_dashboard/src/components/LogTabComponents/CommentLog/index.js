import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CommentLog.css';
import classNames from 'classnames';
import _ from 'lodash';


class CommentLog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id:"1",
      search: '',
      isModalOpen: false,
      messages:[{names:"Alisdair",
      FeedGiven:"6kg",
      dates: "17/01/2019",
      texts: "Increased Temperature and more fish on surface hence more feed added"}]
    }; //change to messages: this.props.messages,
  }
 
  updateSearch(event){
    this.setState({search:event.target.value});
  }
  
  addNewEntry(event){
    event.preventDefault();
    let names = this.refs.names.value;
    let FeedGiven= this.refs.FeedGiven.value;
    let dates= this.refs.dates.value
    let texts = this.refs.texts.value;
    let id =Math.floor((Math.random()*100)+1);
    this.setState({
      messages: this.state.messages.concat({names,FeedGiven,dates,texts})
    });
    this.refs.names.value='';
    this.refs.FeedGiven.value='';
    this.refs.dates.value='';
    this.refs.texts.value='';
  }

  createElement( element ){
    return (
      <div key = {element.id}>
      <li className="media event">
        <a className="pull-left border-aero profile_thumb">
          <i className="fa fa-user aero"></i>
        </a>
        <div className="media-body">
       <a className="title" href="#">{element.names}</a>
          <p><strong>{element.FeedGiven}</strong> Feed supplied </p>
           <p><small>{element.dates}</small></p>
          <p> <small>{element.texts}</small>
          </p>
          </div>
      </li>
      </div>
     )
  }

 
  render() {
      var filteredMesssages= this.state.messages.filter(

        (messages)=>{

            return messages.names.toLowerCase().indexOf(this.state.search.toLowerCase()) !==-1;
              
            }
      );
            console.log(filteredMesssages.dates);
    
    return ( 
      <div className="col-md-12 col-sm-12 col-xs-12">
        <div className={classNames(s["x_panel"], s.tile, s.toMakeSame)}>
          <div className={classNames(s["x_title"])}>
            <h2>Feeding Observations</h2>
            <div className="clearfix"></div>
          </div>
          <div className="box">
              <span className="icon"><i className="fa fa-search"></i></span>
              <input type="Search" 
                placeholder="Search"
                value={this.state.search}
                onChange={this.updateSearch.bind(this)}/>
              <span className="icon"><i className="fa fa-pencil-square-o"></i></span>
          </div>

                <form onSubmit={this.addNewEntry.bind(this)}>
                 <input type="text" placeholder="Name" ref="names" />
                 <input type="text" placeholder="Feed Amount" ref="FeedGiven"/>
                 <input type="text" placeholder="Date & Time" ref="dates"/>
                 <input type="text" placeholder="Comment" ref="texts" />
                 <button type="submit">Add Entry </button>
                </form>
                 

             
          <ul className="list-unstyled top_profiles scroll-view pre-scrollable">
            {_.map(filteredMesssages,this.createElement)}   
          </ul>
        </div>    
      </div>
    );
  }
}

export default withStyles(s)(CommentLog);
