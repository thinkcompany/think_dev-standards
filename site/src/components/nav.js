import React from 'react'
import { Link } from 'gatsby'
import '../scss/main.scss';

const Nav = () => (
  <div>
    <Link
      to="/"
      className="tds-nav"
    > Home </Link>
    <Link
      to="#table-of-contents"
      className="tds-nav2"
    > Top </Link>
  </div>
)

export default Nav
