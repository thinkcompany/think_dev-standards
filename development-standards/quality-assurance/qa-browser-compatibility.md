#Browser Compatibility QA

Browsers sometimes decide to implement different standards and support for new and existing web technologies. It is important to test your application on multiple devices, operating systems, and browsers. This helps to ensure the same experience regardless of the device someone is using.

[ ] **Review the browser support requirements**

Make sure the browser/operating system requirements are clearly defined for the project, and follow them when coding and testing. Always test each browser/device/OS combination based on the requirements of the project.

[ ] **Test on native devices when possible**

When available, test on native devices with as many of the required browser/operating systems as possible. Testing on real devices is preferred and yields more accurate results than simulators. 

[ ] **Use Browserstack to test additional platforms/browsers**

When native device testing isn't possible, [Browserstack](https://www.browserstack.com) allows us to test additional device, OS, and browser combinations. 

[ ] **Autoprefix CSS**

We like to keep the use of vendor prefixes to a minimum. Using a tool like Autoprefixer allows us to author our CSS without prefixes, and automatically apply only the prefixes needed based on our browser support requirements for each project. Autoprefixer should be included in the build script with appropriate settings for the project.

[ ] **Visual and functional regression testing**

Whenever you make a change on a project, it can impact the design and functionality of other parts. Visual regression testing compares changes visually to ensure nothing accidentally breaks. Functional regression testing works similarly by testing certain interactions a user may perform and making sure the intended functionality occurs. 

Both visual and functional regression testing can be supported with automation tools to make the process more efficient and repeatable.

[ ] **Document how each browser / OS combination was tested**

It is important to document your testing methods. Doing so allows us to account for the changes made and be aware of any other testing that may need to be performed.