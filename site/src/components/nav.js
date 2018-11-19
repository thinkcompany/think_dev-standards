import React, {Component} from 'react'
import { Link } from 'gatsby'
import '../scss/main.scss';

class Nav extends Component {

  getURL() {
    return typeof window !== 'undefined' && window.location.pathname + '#table-of-contents';
  }

  render() {
    var createTOCLink = this.getURL();
    return (
      <nav>
        <Link
          to="/"
          className="tds-nav tds-nav--home"
        > Home </Link>
        <Link
          to={createTOCLink}
          className="tds-nav tds-nav--top"
        > Top </Link>
      </nav>
    )
  }

}

export default Nav
