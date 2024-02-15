import React, { Component } from 'react'

export class Newsitem extends Component {

  render() {
   let  {title, description, imageurl, newsUrl, dates} = this.props;


  
    return (
      <div className='myz-3'>
       <div className="card">
            <img src={imageurl} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
             
            </div>
            <div className='date m-2 text-center'> {new Date(dates).toGMTString()} </div>
          </div>
          
          
      </div>
    )
  }
}

export default Newsitem