#Security QA

Security is extremely important and something we take very seriously. You should be taking steps to provide safeguards against basic hacks like SQL injection, remote file inclusion, XSS (cross site scripting), and CSRF (cross site request forgery).

**Have a dev lead check code against OWASP standards / best practices**

OWASP is a great resource for how to secure code. Have your dev lead look over your code and compare it to their standards and best practices.

**Secure Input and Output handling**

When handling data that is sent to or from an application, it is important to secure it. This means checking to make sure data that is going into the system is safe, secure, and valid while also ensuring that the data sent from the sytem meets that criteria as well.

**Do not include sensitive environment information or credentials in project documents or codebase**

Only keep sensitive information like logins, user data, etc where it can be secured. Should a password find its way into Git, remove it from the repositories history. 

**Least priviledged access**

Only people who need access to data, login information, etc should have access to it. Ted from accounting doesn't need the MySQL root password.

**Folder and File Permissions**

Make sure that folders and files have the lowest permissions necessary to run. This will help mitigate remote file inclusions, directory traversal attacks, and jailbreaking.

**Remove Unused Code**

Unused code is still vulnerable code. This is especially true with PHP. Most WordPress, Drupal, and Joomla hacks come from plugins that are deactivated but can still be exploited.

**Remove metadata from SVGs**



