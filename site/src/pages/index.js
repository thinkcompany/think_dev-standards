import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import '../scss/main.scss';

const IndexPage = () => (
  <Layout>
    <h2>Think Company Front-End Web Development Standards</h2>
    <p>The basic principles of the Think Company Front-End Web Development Standards are simple: keep code modular and flexible; support the greatest number of browsers without overwhelming older browsers with polyfills and hacks; ensure graceful degradation and accessibility at all times; and keep the experience light and fast. Developers should speak up any time they feel that they cannot meet the standards, or when they see an opportunity to add a common practice to these standards. </p>
    <p>The Front-End Web Development Standards are broken down into coding guidelines for HTML, CSS, JavaScript, Accessibility, SEO, and Performance: some information is duplicated across sections for easy reference. </p>
    <h3>Chapters</h3>
    <ul>
      <li><Link to="/html/">HTML Standards</Link></li>
      <li>Style Sheets</li>
      <ul>
        <li><Link to="/css/">CSS Standards</Link></li>
        <li><Link to="/sass/">Sass Standards</Link></li>
      </ul>
      <li>
        <Link to="/js-standards/">JavaScript Standards</Link>
      </li>
      <ul>
        <li>
          <Link to="/javascript/general/">General JS Authoring</Link>
        </li>
        <li>
          <Link to="/javascript/jquery/">JQuery Best Practices</Link>
        </li>
        <li>
          <Link to="/javascript/resources/">Resources</Link>
        </li>
      </ul>
      <li><Link to="/accessibility">Accessibility Standards</Link></li>
      <li>Quality Assurance</li>
      <ul>
        <li><Link to="/automated-testing/">Automated Testing Standards</Link></li>
        <li><Link to="/quality-assurance/qa/">Quality Assurance</Link></li>
      </ul>
      <li><Link to="/git/">Git Standards</Link></li>
      <li><Link to="/performance/">Performance Standards</Link></li>
      <li><Link to="/seo/">SEO Standards</Link></li>
    </ul>
  </Layout>
)

export default IndexPage
