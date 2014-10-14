# CSS Development Standards

At Think Brownstone we've standardized around modular CSS with Sass, focused on the approaches outlined in [Scalable and Modular Architecture for CSS (herein SMACSS)](https://smacss.com/), and peppered with some [Block, Element, Modifier (herein BEM)](http://bem.info/
) methodology.

## SMACSS

We break CSS down into five types of categories:

1. Base
2. Layout
3. Module
4. State
5. Theme

This helps us avoid complexity and easily move between style rules in a logically ordered way. 

## BEM

BEM is a methodology that spans an entire project's lifecycle. Designers, Front-End Developers, and Back-End Developers are all working on the same codebase, and are always aware of how design decisions inform architecture decisions. These are the origins of the BEM methodology:

* Standard projects should be developed fast and the results last long: a product created in a short time, built on an architecture that ensures its maintainability and longevity for years.
* A project involves many people. The ability to efficiently organize people’s work in a team is important, whether it’s a team of two or dozens of developers.
* Scalable teams. Adding more people to a team should improve the team’s performance. A process must be in place that ensures that new developers are brought up to speed quickly and are duly allocated their specific areas of responsibility. Code must be carefully structured to ensure its maintainability over time and through team changes.
* Code reuse. Each new project or interface element should not be started from scratch. Code reuse between similar tasks should be maximized within the company. Code should not be context-dependent but be easily transferable to different contexts. 

[This Treehouse course](http://teamtreehouse.com/library/modular-css-with-sass) is a great place to start if you're new to these concepts.

## Notes

### Handcrafted CSS

## Related Reading Material

[Dropbox Design Cabin](https://medium.com/@_dte/building-the-dropbox-design-cabin-9fdec4356671)