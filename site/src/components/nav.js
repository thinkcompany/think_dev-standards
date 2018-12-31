import React, {Component} from 'react'
import { Link } from 'gatsby'
import '../scss/main.scss';

class Nav extends Component {

  constructor(props) {
    super(props)
    this.state = {
      TOCurl: '/',
    };
  }

  componentDidMount() {
    this.getURL();
  }

  getURL() {
    this.setState({ TOCurl: window.location.pathname + '#table-of-contents' })
  }

  render() {
    return (
      <nav>
        <Link
          to="/"
          className="tds-nav tds-nav--home"
        > Home </Link>
        <Link
          to={this.state.TOCurl}
          className="tds-nav tds-nav--top"
        > Top </Link>
      </nav>
    )
  }

}

export default Nav
