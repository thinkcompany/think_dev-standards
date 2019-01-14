# Think Company Development Standards
[Think Company](http://thinkcompany.com) is an experience design consultancy located in Philadelphia, PA. We have a fantastic team of designers and developers focused on providing beautiful, user-centered, accessible digital products.

## Codebase
This repository contains the standards, in Markdown, by which Think Company developers write outstanding technical products for our clients. You can find them in the `content` directory.

In the `site` directory, developers are also able to use Gatsby to consume those documents and generate a static HTML + CSS website.

## Requirements
To make updates to the static version of our docs site, you'll need to:

- [Install Node.js LTS](https://nodejs.org/en/download/)
    - or use [nvm](https://github.com/creationix/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows)

## Installation
- Clone this repository to your local machine: `git clone git@bitbucket.org:thinkcompany/think_dev-standards.git`
- In your terminal, `cd` to the root of this project directory
- Run `npm install` to install Node dependencies and build the site
- Run `npm start` to start the Gatsby development server.
- Navigate to: [http://localhost:8000](http://localhost:8000) to get started.

## Environments
- Production: [http://standards.dev.thinkcompany.com](http://standards.dev.thinkcompany.com)
- Staging: [http://standards-staging.dev.thinkcompany.com](http://standards-staging.dev.thinkcompany.com)

### Deployments
This project uses Bitbucket Pipelines for automatic deployments to [http://standards.dev.thinkcompany.com](http://standards.dev.thinkcompany.com) and [http://standards-staging.dev.thinkcompany.com](http://standards-staging.dev.thinkcompany.com).

## Support
Please [open an issue](https://thinkbrownstone.atlassian.net/projects/THINKDOCS/issues?filter=allissues) for support, or use the *#ui-dev* channel in Slack.

## Contributing
Please contribute using [Gitflow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow). Create a branch, add commits, and [open a pull request](https://bitbucket.org/thinkcompany/broadstreetminhcc_site/pull-requests/).

Branch names should follow the following formats:

- New features / additions: `feature/THINKDOCS-0000-new-feature-name` (where THINKDOCS-000 is the ticket number)
- Bugfixes: `fix/THINKDOCS-0000-bugfix-description`
- Releases: `release/release-1.0.0` 

This project uses [JIRA Smart Commit](https://confluence.atlassian.com/fisheye/using-smart-commits-298976812.html) messages to tie commit, branch, and pull request history back to each JIRA ticket. Please follow this format as often as possible:

```
THINKDOCS-0000 #time 1.5h #comment changed dotted lines to dashes, and dashed lines to dots
```

If you solve a tricky bug, the next person who works on this codebase will appreciate you including a Stack Overflow or Github Issue link to help understand why the change was made!