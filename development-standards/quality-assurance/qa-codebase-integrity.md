#Codebase Integrity QA

Codebase Integrity helps keep our repositories and code clean, easy to understand, and dead simple for anyone to pickup and start coding with.

[ ] **Remove unused assets and scripts from the project**

There are certain files that should never be in a repository. Rendered/compiled files, user generated content, and extremely large images and vidoes are a couple examples. 

[ ] **Verify all dependencies are included, and unused dependencies are removed**

If a project cannot run correctly without certain libraries or assets, make sure they are included. You should never have a dependency that exists on your local development envrionment but not in the repository.

Note that we do not store `node_modules` in the repo, only the package.json file that references the modules.

[ ] **Document custom functions**

Someone will eventually work with the code you write, make sure you provide adequate commenting. Function comment blocks, inline comments explaining gotchas, or choices for a solution make everyone's life much easier.

[ ] **Include pre-compiled source files (Sass/Less) if required**

If a project stipulates the need to include preompiled source files, then they should be included.

[ ] **Verify that file/directory structure is clear, FLAT, and consistent**

Make sure files and folders follow standard naming conventions, are consistent, and match the content inside of them.  A `js` folder should only contain javascript files for example, and a file called `modal.js` should only contain JavaScript for a modal. 

Use as few folders as possible to ensure that the application has a flat file structure.

[ ] **Verify that the project README is complete, and current**

Ensure that the project README file is always current and contains all of the information that a developer needs to get up and running. Include things like prequisites, build/installation steps, along with deployment instructions.