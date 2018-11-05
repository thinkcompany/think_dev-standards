import React from 'react'
import { Link } from 'gatsby'
import '../scss/main.scss';

const Nav = () => (
  <div>
    <Link
      to="/"
      style={{
        color: 'black',
        textDecoration: 'none',
      }}
    > Home </Link>
  </div>
)

export default Nav
