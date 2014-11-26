# Think Brownstone Sass Template

This is a starter template for any front-end TBI project. There are a number of utilties, mixins, helpers, and starting points that are described herein.

## Installation

1. Pull down the latest repository
2. Install [Node](http://nodejs.org/)
3. Run `npm install` (sometimes `sudo npm install`) from within the `development-standards/css/sass-template` directory
4. Make sure you have Gulp installed by running `gulp -v` if you get `gulp: command not found`, run `sudo npm install gulp -g`
4. Ensure you have Ruby Sass installed
	1. Run `gem install sass` (sometimes `sudo gem install sass`)
	2. Ensure you have at least Sass 3.3 installed by running `sass -v`
5. You're done!

Running `gulp` will start a webserver at `localhost:8080`, watch for file changes in `src`, and livereload when it sees those changes.

## Contents

### `.scss` Files

#### `_extends.scss`

The extends file contains styles that we can reuse in element rules which sometimes use the same CSS, but then modify on top of base styles.

Instead of:

```
.nav__item{
	display: inline-block;
	margin: 0 em(12px);
}
.nav__item--current{
	display: inline-block;
	margin: 0 em(12px);
	opacity: 0.75;
}
```

We keeps it DRY by defining the base styles as a placeholder, and including it in both rules:

```
%nav-item-display{
	display: inline-block;
	margin: 0 em(12px);
}
.nav__item{
	@extends %nav-item-display;
}
.nav__item--current{
	@extends %nav-item-display;
	opacity: 0.75;
}
```

## Resources

* [enabling sourcemaps in Chrome](https://developer.chrome.com/devtools/docs/css-preprocessors)

## Notes

* include information about @extending class names, and how that adds comma separation to those classes

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
- [ ] Build out `_base` partial
- [ ] Build out `_config` partial
- [ ] Build out `_extends` partial
- [ ] Build out `_forms` partial
- [ ] Build out `_headlines` partial
- [ ] Build out `_helpers` partial
- [ ] Build out `_main` partial
- [ ] Build out `_nav` partial
- [ ] Build out `_reset` partial
- [ ] Build out `_utilities` partial
- [ ] Wrap up `styles.scss`
- [ ] Determine the best syntax to build bemful classes and html: http://viget.com/extend/bem-sass-modifiers
- [ ] Document all Sass partials
	- [ ] Describe how each file works and what it should contain
- [ ] Document the process for sourcemapping files above webroot (map to filesystem resource in [Chrome Devtools](https://developer.chrome.com/devtools/docs/workspaces#mapping-a network resource))
- [ ] Move Sass template into a public repo and add as a submodule
- [ ] Standardize media query naming conventions ([Great start here](http://css-tricks.com/naming-media-queries/))
- [ ] Someday / Maybe
	- [x] [Add sourcemapping](http://fettblog.eu/blog/2014/04/10/gulp-sass-autoprefixer-sourcemaps/)
	- [ ] `gulp-util` for good messages on compile
	- [ ] `gulp-filesize` outputs filesizes before/after compiling
	- [ ] add some flags for dev work
		- [ ] add [`gulp-if`](https://github.com/robrich/gulp-if) for dev/production flags (to supress CSS minification)
	- [ ] Do we want to CSS Lint?
	- [ ] Do we want to add Bless?