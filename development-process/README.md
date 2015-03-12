# TBI Development Process

A collection of outlines defining the development process. Location of internal documents, the appropriate places to store credentials, the steps involved with creating a new development area for client work, and other good to knows.

## Project Process

Who should be involved from what team and when? Where and when should documents be created, and what information should they contain?

## Repository Set Up

1. Start by creating a new directory for the project
2. Clone down any development utilities, templates, etc
3. Create a `.gitignore` file and add typical files/directories, like `.DS_Store` for example
4. Create a `README.md` file and document everything you do from this point on (minus any credentials)
5. Initialize your repository by running `git init`
6. Add all of the files in your project by running `git add -A`
7. Commit your changes by running `git commit -m 'whatever message makes most sense'`
8. Follow [this guide](https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/) to publish this new repository to Github
9. Rock and roll

## Dev Server Setup

### Creating a subdomain

### Adding authentication

### Setting up a database

## Local Development

### Gulp

We use gulp for development task automtation. Below you'll find a collection of our favorites, and some instructions describing the setup process.

#### Installation

Gulp is a utility hosted with `npm`, the nameless package manager (made famous by Node.js).

1. Start by [installing Node](https://www.npmjs.com/package/gulp-strip-debug).
2. `npm` comes with Node. Now you can run `npm install`... in a project directory and Node packages will be installed in a `node_modules` directory.
3. Run `npm install --global gulp`, which will install Gulp globally so you can use it in any project.
4. Profit.

#### Typical Project Setup

You'll find project-specific instructions in a `README.md` file at the root of the project. Typically all you'll need to do is run `npm install` and all of a project's dependencies will be download and installed to `node_modules`.

#### Installing New Plugins

Find a plugin below or add a new one to the list, then use `npm install gulp-plugin-name --save-dev` to install it. The `--save-dev` command flag saves this plugin as a dependency to the `package.json` file.

#### Fave Plugins

* [`gulp-strip-debug`](https://www.npmjs.com/package/gulp-strip-debug) removes console and debugger statements from JavaScript (useful for testing in old versions of Internet Explorer)