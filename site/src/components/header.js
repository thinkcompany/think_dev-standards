import React from 'react'
import { Link } from 'gatsby'
import '../scss/main.scss';

const Header = () => (
  <div className='tds-util-header'>
    <div className='tds-util-header-inner'>
      <Link to="/">
        <div className="svg-logo-think think-logo-top">
          <span className="visually-hidden">Think Company</span>
        </div>
      </Link>
    </div>
  </div>
)

export default Header
