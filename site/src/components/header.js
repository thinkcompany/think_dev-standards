import React from 'react'
import { Link } from 'gatsby'
import '../scss/main.scss';

const Header = () => (
  <div className="tds-header">
    <div className="tds-header-inner">
      <Link to="/">
        <div className="tds-header-logo-think">
          <span className="visually-hidden">Think Company</span>
        </div>
      </Link>
    </div>
  </div>
)

export default Header
