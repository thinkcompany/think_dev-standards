import React from 'react'
import { Link } from 'gatsby'
import '../scss/main.scss';

const Footer = () => (
  <footer className="tds-footer">
    <div className="svg-logo-think think-logo-footer"><span className="visually-hidden">Think Company</span></div>
    <div className="tds-think-cards">
      <div className="tds-card tds-think-card">
        <i className="think-icon svg-icon-what"></i>
        <div className="tds-think-card-body">
          <h4>About Think Company</h4>
          <p>We help you create great experiences for your customers and employees.</p>
          <Link to="http://thinkcompany.com/about">Learn More</Link>
        </div>
      </div>
      <div className="tds-card tds-think-card">
        <i className="think-icon svg-icon-blog"></i>
        <div className="tds-think-card-body">
          <h4>Read the Think Blog</h4>
          <p>Design ideas, wit, and wisdom from our team.</p>
          <Link to="http://thinkcompany.com/blog">Start reading</Link>
        </div>
      </div>
    </div>
    <div className="tds-copyright">
      <small>Designed and built by Think Company in Philadelphia</small>
    </div>
  </footer>
)

export default Footer
