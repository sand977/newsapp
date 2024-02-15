import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spin from './Spin';
import PropTypes from 'prop-types';

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: "general" 
    
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor() {

    super();
    console.log("hello this is constructor from news js")
    this.state = {
      //  articles: this.articles,
      articles: [],
      loading: false,
      page: 1


    }
  }

  async componentDidMount() {
    console.log("cdm");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=2d4dd5c3413641e39bb651dedd5cee97&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata);
    this.setState({
      articles: parsedata.articles,
      loading: false
    })

  }
  handlepreviousclick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=2d4dd5c3413641e39bb651dedd5cee97&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedata = await data.json()
    console.log(parsedata)

    this.setState({
      page: this.state.page - 1,
      articles: parsedata.articles,
      loading: false

    })
  }
  handlenextclick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=2d4dd5c3413641e39bb651dedd5cee97&page=${this.state.page + 1} &pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedata = await data.json()
    // console.log(parsedata)

    this.setState({
      page: this.state.page + 1,
      articles: parsedata.articles,
      loading: false

    })
  }


  render() {
    console.log("render")
    return (
      <div className='container-fluid  '>
        <h2 className="text-center m-5 p-3 bg-danger text-light">NewsToday - Top Healines</h2>
        {this.state.loading && <Spin />}
        <div className="row m-3">
    {!this.state.loading && 
      this.state.articles &&
       (
      this.state.articles.map((element) => (
        <div className="col-12 col-sm-6 col-md-4 my-3" key={element.url}>
          <Newsitem
            title={element ? element.title : ""}
            description={element ? element.description : ""}
            imageurl={element.urlToImage}
            newsUrl={element.url}
            dates={element.publishedAt}
          />
        </div>
      ))
    )}
        <div className="container d-flex justify-content-between my-4">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-primary" onClick={this.handlepreviousclick}>
            &larr; previous
          </button>
          <button type="button" className="btn btn-primary" onClick={this.handlenextclick}>
            Next &rarr;
          </button>
        </div>

      </div>
      </div>
    )
  }
}

export default News