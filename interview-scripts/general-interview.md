Interviewing
Interview Process 

1. Phone screen by telephone - 30-45 minutes - with hiring manager or HR representative. Purpose is (a) to understand what the candidate is looking for and (b) to explain the role and gauge interest, so we can determine if we should go the next step.

2. Tech screen by telephone - 30-60 minutes - with a senior or lead developer. (Sometimes a second tech screen may be necessary.) Cover technical skills appropriate for the role. Give feedback to hiring manager to determine if we should go the next step.

3. In person interview - 2 hours - with hiring manager, one or two developers (ideally not the same people who did phone screens), and one other TBIer (non-dev for Think Exercise review). Mix of behavioral interview and technical interview. Interview team gives feedback to hiring manager, who makes the call on whether or not to extend an offer to the candidate. 

Phone Screen Questions
Describe the JS concept of the prototype and how understanding it is important to development
Describe the concept of MVC and how the architectural philosophy impacts development
What tenets of web development do you follow/what’s most important to you when building a website
Tell me about your favorite front-end technologies
How do you keep up with the advancements in the web/UX world
Name 3-5 things that you prioritize when considering site performance
Different types of positioning in CSS and what the distinctions are between them and how they’re used
If you were on a team and you found that someone was not pulling their weight, what would you do/how would you handle that
Describe a scenario where you managed to improve a project (from a technical perspective) you were working on in the face of opposition from other people on the team or a client.  Explain your process for winning the team / client over and how the project benefitted from your contribution.
Tell me about the project/code you’re most proud of
Tell me about a project that went spectacularly wrong and what you learned from it
Describe your debugging process (where do you start when something’s going wrong…)
Describe a few common accessibility problems and how you would solve them.
When writing CSS, do you prefer to use ID's or classes to style elements?

Email/In Person Questions
Which of the following DOCTYPEs will enable strict (standards) rendering mode in modern browsers?
<!DOCTYPE HTML PUBLIC “-//W3C//DTD HTML 4.0 Transitional//EN”>
<!DOCTYPE html PUBLIC “-//W3C//DTD XHTML 1.0 Strict//EN” “http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd”>
<!DOCTYPE HTML PUBLIC “-//W3C//DTD HTML 4.01 Frameset//EN” “http://www.w3.org/TR/html4/frameset.dtd”>
<!DOCTYPE html PUBLIC “-//W3C//DTD XHTML 1.0 Transitional//EN” “DTD/xhtml1-transitional.dtd”>
<!DOCTYPE html>
Which markup structure is most semantic for a title within a document body, considering that the title may be horizontally centered using a large, bold, red font? (And then explain why your selection is the most semantic.)
<span class=“title”>This is a Title</span>
<h1>This is a Title</h1>
<p align=“center”><font size=“+3”><b>This is a Title</b></font></p>
<h1 style=“font-weight:bold; font-size:large; text-align:center; color:red;”>This is a Title</h1>
<title>This is a Title</title>
<h1 class=“LargeRedBoldCenterHeading”>This is a Title</h1>
Consider the two methods for including external style sheets in an HTML document. What are the two methods and the pros and cons of each? Given your list of pros and cons, which method for including external style sheets is best?
Explain the difference between the following CSS selectors:
p a
p .a
p.a
p > a
p + a
Let’s assume you’re using the XHTML 1.0 Strict doctype and coding hyperlinks that should launch new windows. Can you code this using HTML only? Why or why not? If you use JavaScript to open new windows, describe the solution.
Ajax breaks the traditional client/server “page” paradigm and requires developers to think differently about building Web sites. Name at least three things that require special attention or consideration when developing an Ajax application.
You are creating a two-column layout using two floated DIVs (one floated to the left, one floated to the right), followed by a footer that spans the width of the viewport. There is a border that surrounds the two columns, but not the footer. Write the HTML and CSS that will properly render this layout in all modern browsers, plus older versions of IE (back to 6) and Firefox (back to 3.6).
Identify the accessibility issues in the following code and describe possible solutions to those issues.
<!DOCTYPE html>
<html lang=“en”>
<head>
<title>Fun Little Widget</title>
</head>
<body>
<div style=“width:250px; height:200px; margin:1em; border:3px solid #333; padding:10px; font-size:12px; overflow:hidden;”>
<h2><a href=“#” onmouseover=“document.getElementById(‘box’).style.display=‘block’;” onmouseout=“document.getElementById(‘box’).style.display=‘none’;”>What’s in the box?</a></h2>
<div id=“box” style=“display:none;”>
<p><b>Peek-a-boo!</b></p>
<form method=“post” action=“search”>
<div>
<label><img src=“search.gif” width=“150” height=“20” alt="" /> <input id=“query” value="" /></label> 
<input type=“submit” value=“Go!” />
</div>
</form>
</div>
</div>
</body>
</html>