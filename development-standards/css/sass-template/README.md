# Think Brownstone Sass Template

This is a starter template for any front-end TBI project. There are a number of utilties, mixins, helpers, and starting points that are described herein.

## Installation

1. Pull down the latest repository
2. Install [Node](http://nodejs.org/)
3. Run `npm install` (sometimes `sudo npm install`) from within the `development-standards/css/sass-template` directory
4. Ensure you have Ruby Sass installed
	1. Run `gem install sass` (sometimes `sudo gem install sass`)
	2. Ensure you have at least Sass 3.3 installed by running `sass -v`
5. You're done!

Running `gulp` will start a webserver at `localhost:8080`, watch for file changes in `src`, and livereload when it sees those changes.

## Contents

### `.scss` Files

## Task List

- [x] Add Readme
- [x] Write installation instructions
- [ ] Pick and install Gulp modules
	- [x] Sass
	- [x] Gulp clean
	- [ ] Auto prefixer
	- [ ] Minifier
	- [x] ~~Livereload~~ (gulp-connect comes with livereload)
	- [x] Watch
	- [x] Connect
- [ ] Write `gulpfile.js`
- [ ] Fill in README section for Gulp Plugins
- [ ] Ignore compiled directories
- [ ] Build out `_config` template
- [ ] Build out `_base` template
- [ ] Build out `_mixins` template
- [ ] Build out `_helpers` template
- [ ] Build out `_extends` template
- [ ] Build out `_utilities` template
- [ ] Build out `_nav` template
- [ ] Document all `_.scss` files
	- [ ] Describe how each file works and what it should contain
- [ ] Move Sass template into a public repo and add as a submodule
- [ ] Someday / Maybe
	- [ ] [Add sourcemapping](http://fettblog.eu/blog/2014/04/10/gulp-sass-autoprefixer-sourcemaps/)
	- [ ] `gulp-util` for good messages on compile
	- [ ] `gulp-filesize` outputs filesizes before/after compiling
	- [ ] add some flags for dev work
		- [ ] add [`gulp-if`](https://github.com/robrich/gulp-if) for dev/production flags (to supress CSS minification)
	- [ ] Do we want to CSS Lint?
	- [ ] Do we want to add Bless?