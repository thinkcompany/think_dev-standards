import React from 'react'
import { Link } from 'gatsby'
import '../scss/main.scss';

const Header = ({ siteTitle }) => (
  <div className='hub-util-header'>
    <div className='hub-util-header-inner'>
      <div class="svg-logo-think think-logo-top">
        <span class="visually-hidden">Think Company</span>
      </div>
      <div>
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
          >
            {siteTitle}
          </Link>
        </h1>
      </div>
    </div>
  </div>
)

export default Header
