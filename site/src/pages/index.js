import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import '../scss/main.scss';

const IndexPage = () => (
  <Layout>
    <ul>
      <li><Link to="/html/">HTML Standards</Link></li>
      <li>Style Sheets</li>
      <ul>
        <li><Link className="hub-entry-link" to="/css/">CSS Standards</Link></li>
        <li><Link className="hub-entry-link" to="/sass/">Sass Standards</Link></li>
      </ul>
      <li>
        <Link className="hub-entry-link" to="/js-standards/">JavaScript Standards</Link>
      </li>
      <ul>
        <li>
          <Link className="hub-entry-link" to="/general/">General JS Authoring</Link>
        </li>
        <li>
          <Link className="hub-entry-link" to="/jquery/">JQuery Authoring</Link>
        </li>
      </ul>
      <li><Link className="hub-entry-link" to="/accessibility">Accessibility Standards</Link></li>
      <li>Quality Assurance</li>
      <ul>
        <li><Link className="hub-entry-link" to="/automated-testing/">Automated Testing Standards</Link></li>
        <li><Link className="hub-entry-link" to="/quality-assurance/qa/">Quality Assurance</Link></li>
      </ul>
      <li><Link className="hub-entry-link" to="/git/">Git Standards</Link></li>
      <li><Link className="hub-entry-link" to="/performance/">Performance Standards</Link></li>
      <li><Link className="hub-entry-link" to="/seo/">SEO Standards</Link></li>
      <li><Link className="hub-entry-link" to="/resources/">Resources</Link></li>
    </ul>
  </Layout>
)

export default IndexPage
