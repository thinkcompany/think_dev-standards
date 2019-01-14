---
path: "/git/"
date: "2018-11-01"
title: "GIT Development Standards"
---

# Git Style Guide

This document contains Think Company's standards for using Git.

## Table of contents

- [Branches](#branches)
- [Commits](#commits)
  - [Messages](#messages)
- [Merging](#merging)
- [Misc.](#misc)

This is a Git Style Guide inspired by [*How to Get Your Change Into the Linux
Kernel*](https://www.kernel.org/doc/Documentation/SubmittingPatches),
the [git man pages](http://git-scm.com/doc) and various practices popular
among the community. Forked from: [agis-/git-style-guide](https://github.com/agis-/git-style-guide)

If you feel like contributing, please do so! Fork the project and open a pull
request.

## Branches

* Identify branches by features (new development) or fixes (refactoring)
* Choose *short* and *descriptive* names

Bad Example (too vague):   
  ```shell
  $ git checkout -b feature/login_fix
  ```

Good Example:
  ```shell
  $ git checkout -b feature/oauth-migration
  ```

* Identifiers from corresponding tickets in an external service (eg. a GitHub
  issue) are also good candidates for use in branch names. It's even better if you include a short descriptive name 
  that identifies what you're working on. For example:

Good Example:
  ```shell
  # GitHub issue #15
  $ git checkout -b fix/issue-15
  ```
Better Example:
  ```shell
    # GitHub issue #15
    $ git checkout -b fix/issue-15-nav-dropdown
  ```

* Use *dashes* to separate words.

  [Merge](#merging) at will the personal branches to the team-wide branch
  *after* rebasing onto it (in order to maintain a simple history). Eventually,
  the team-wide branch will be merged to `master`.

* Delete your branch from the upstream repository after it's merged (unless
  there is a specific reason not to).

  Tip: Use the following command while being on "master", to list merged
  branches:

  ```shell
  $ git branch --merged | grep -v "\*"
  ```

## Commits

* Each commit should be a single *logical change*. Don't make several
  *logical changes* in one commit. For example, if a patch fixes a bug and
  optimizes the performance of a feature, split it into two separate commits.

* Don't split a single *logical change* into several commits. For example,
  the implementation of a feature and the corresponding tests should be in the
  same commit. Changes to a precompiled style resource and the resulting compiled `.css` should be in the same commit.

* Commit *early* and *often*. Small, self-contained commits are easier to
  understand and revert when something goes wrong.

* Commits should be ordered *logically*. For example, if *commit X* depends
  on changes done in *commit Y*, then *commit Y* should come before *commit X*.

### Messages

* Use the editor, not the terminal, when writing a commit message:

  ```shell
  # good
  $ git commit

  # bad
  $ git commit -m "Quick fix"
  ```

  Committing from the terminal encourages a mindset of having to fit everything
  in a single line which usually results in non-informative, ambiguous commit
  messages.

* If a *commit A* depends on another *commit B*, the dependency should be
  stated in the message of *commit A*. Use the commit's hash when referring to
  commits.

  Similarly, if *commit A* solves a bug introduced by *commit B*, it should
  be stated in the message of *commit A*.

## Merging

* **Do not rewrite published history.** The repository's history is valuable in
  its own right and it is very important to be able to tell *what actually
  happened*. Altering published history is a common source of problems for
  anyone working on the project.

* However, there are cases where rewriting history is legitimate. These are
  when:

  * You are the only one working on the branch and it is not being reviewed.

  * You want to tidy up your branch (eg. squash commits) and/or rebase it onto
    the "master" in order to merge it later.

  That said, *never rewrite the history of the "master" branch* or any other
  special branches (ie. used by production or CI servers).

* Keep the history *clean* and *simple*. *Just before you merge* your branch:

    1. Make sure it conforms to the style guide and perform any needed actions
       if it doesn't (squash/reorder commits, reword messages etc.)

    2. Rebase it onto the branch it's going to be merged to:

       ```shell
       [my-branch] $ git fetch
       [my-branch] $ git rebase origin/master
       # then merge
       ```

       This results in a branch that can be applied directly to the end of the
       "master" branch and results in a very simple history.

       *(Note: This strategy is better suited for projects with short-running
       branches. Otherwise it might be better to occassionally merge the
       "master" branch instead of rebasing onto it.)*

* If your branch includes more than one commit, do not merge with a
  fast-forward:

Good Example (ensure that a merge commit is created):
  ```shell
  $ git merge --no-ff my-branch
  ```
Bad Example:
  ```shell
  $ git merge my-branch
  ```

## Misc.

* There are various workflows and each one has its strengths and weaknesses.
  Whether a workflow fits your case, depends on the team, the project and your
  development procedures.

  That said, it is important to actually *choose* a workflow and stick with it.

* *Be consistent.* This is related to the workflow but also expands to things
  like commit messages, branch names and tags. Having a consistent style
  throughout the repository makes it easy to understand what is going on by
  looking at the log, a commit message etc.

* *Test before you push.* Do not push half-done work. Use stashes to save it instead.

* Use [annotated tags](http://git-scm.com/book/en/v2/Git-Basics-Tagging#Annotated-Tags) for
  marking releases or other important points in the history.

  Prefer [lightweight tags](http://git-scm.com/book/en/v2/Git-Basics-Tagging#Lightweight-Tags) for personal use, such as to bookmark commits
  for future reference.

# License

![cc license](http://i.creativecommons.org/l/by-nc/3.0/88x31.png)

This work is licensed under a Creative Commons Attribution-NonCommercial 4.0
International license.

# Credits

Agis Anastasopoulos / [@agisanast](https://twitter.com/agisanast) / http://agis.io