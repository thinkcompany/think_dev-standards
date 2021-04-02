# Think Company Front-End Development Standards
[Think Company](http://thinkcompany.com) is an experience design consultancy located in Philadelphia, PA. We have a fantastic team of designers and developers focused on providing beautiful, user-centered, accessible digital products.

## Codebase
This repository contains the standards, in Markdown, by which Think Company developers write outstanding technical products for our clients. You can find them in the `content` directory.

This codebase uses [Gatsby](https://www.gatsbyjs.org/) to consume those Markdown files and generate a static website.

## Requirements
To make updates to the static version of our docs site, you'll need to:

- [Install Node.js LTS](https://nodejs.org/en/download/)
    - or use [nvm](https://github.com/creationix/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows)

## Installation
- Clone this repository to your local machine: `git clone git@github.com:thinkcompany/think_dev-standards.git`
- In your terminal, `cd` to the root of this project directory
- Run `npm install` to install Node dependencies and build the site
- Run `npm start` to start the Gatsby development server.
- Navigate to: [http://localhost:8000](http://localhost:8000) to get started.

## Environments
- Production: [http://standards.thinkcompany.dev](http://standards.thinkcompany.dev)
- Each branch pushed to `origin` results in [Netlify](https://www.netlify.com) building a branch deploy.
- Each pull request created results in Netlify building a deploy preview.

### Deployments
This site uses [Netlify](https://www.netlify.com) to build and host the site.

## Support
Please [open an issue](https://thinkbrownstone.atlassian.net/projects/THINKDOCS/issues?filter=allissues) for support, or use the *#ui-dev* channel in Think Company Slack.

## Contributing
Please contribute using [Gitflow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow). Create a branch, add commits, and [open a pull request](https://github.com/thinkcompany/think_dev-standards/pulls).

Branch names should follow the following formats:

- New features / additions: `feature/THINKDOCS-0000-new-feature-name` (where `THINKDOCS-000` is the issue key)
- Bugfixes: `fix/THINKDOCS-0000-bugfix-description`
- Releases: `release/release-1.0.0` 

If you solve a tricky bug, the next person who works on this codebase will appreciate you including a Stack Overflow or Github Issue link to help understand why the change was made!