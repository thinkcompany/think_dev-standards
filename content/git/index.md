---
title: Git Development Practices
date: "2021-04-02T23:46:37.121Z"
area: Git
section: 1. Branches
description: ""
---

This document contains Think Company's standards for using Git.

## Table of contents

- [Branches](#branches)
- [Commits](#commits)
  - [Messages](#messages)
- [Merging](#merging)
- [Pull Requests](#pull-requests)
- [Misc.](#misc)

This is a Git Style Guide inspired by [*How to Get Your Change Into the Linux
Kernel*](https://www.kernel.org/doc/html/latest/process/submitting-patches.html),
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

* When [merging](#merging) personal branches into shared branches, the personal
  branch should be rebased onto the shared branch first in order to maintain a
  clean history. If you need to clean up any commit messages or squash commits,
  use the `-i` flag to enter the rebase interactive mode. When you are done with
  the rebase, you will need to force push the new history to the remote.

  ```shell
  $ git checkout main && git pull
  $ git checkout feat/update-nav-color
  $ git rebase main
  # interactive rebase:
  $ git rebase -i main
  # force push the branch's new history to the remote
  $ git push --force
  ```

* ⚠️ You should _NEVER_ use force push to rewrite history on a shared branch
  unless you _really_ understand what you are doing! In the unlikely situation that
  it this is necessary, make sure the _entire_ team is aware when it is happening, and
  what they need to do to safely update the branch without losing any of their work.

* Delete your branch from the upstream repository after it's merged (unless
  there is a specific reason not to). To delete local and remote branches,
  use the following commands _with caution_:

  ```shell
  # delete a local branch
  $ git branch -d <branch_name>
  # delete an unmerged local branch
  $ git branch -D <branch_name>
  # delete a branch on the remote named "origin" (most common)
  $ git push -d origin <branch_name>
  ```

* 🤓 Use the following command while being on the main branch, to list merged
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
  same commit.

* Commit *early* and *often*. Small, self-contained commits are easier to
  understand and revert when something goes wrong.

* Commits should be ordered *logically*. For example, if *commit X* depends
  on changes done in *commit Y*, then *commit Y* should come before *commit X*.

* 🤓 [rebase](https://git-scm.com/docs/git-rebase) and [--amend](https://git-scm.com/docs/git-commit#Documentation/git-commit.txt---amend)
  are useful commands that can help you maintain a clean commit history on your
  _personal_ working branches. Learn them to save time and frustration!

### Messages

* Use the editor or a git GUI (e.g. [SourceTree](https://www.sourcetreeapp.com/) and [GitKraken](https://www.gitkraken.com/)), not the terminal, when writing a commit message:

  ```shell
  # good
  $ git commit

  # bad
  $ git commit -m "Quick fix"
  ```

  Committing from the terminal encourages a mindset of having to fit everything
  in a single line which can result in non-informative, ambiguous commit
  messages.

* If a *commit A* depends on another *commit B*, the dependency should be
  stated in the message of *commit A*. Use the commit's hash when referring to
  commits.

  Similarly, if *commit A* solves a bug introduced by *commit B*, it should
  be stated in the message of *commit A*.

* Consider having your team adopt a standard format for commit messages, such as
  [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). Then,
  adding in tooling to help enforce the standard, such as [commitlint](https://commitlint.js.org/#/)
  and [commitzen](http://commitizen.github.io/cz-cli/).

## Merging

* ⚠️ **Do not rewrite published history.** The repository's history is valuable in
  its own right and it is very important to be able to tell *what actually
  happened*. Altering published history is a common source of problems for
  anyone working on the project.

* However, there are cases where rewriting history is legitimate. These are
  when:

  * You are the only one working on the branch and it is not being reviewed.

  * You want to tidy up your branch (eg. squash commits) and/or rebase it onto
    the main branch in order to merge it later.

  That said, *never rewrite the history of the main branch* or any other
  special branches (ie. used by production or CI servers).

* Keep the history *clean* and *simple*. *Just before you merge* your branch:

    1. Make sure it conforms to the style guide and perform any needed actions
       if it doesn't (squash/reorder commits, reword messages etc.)

    2. Rebase it onto the branch it's going to be merged to:

       ```shell
       [my-branch] $ git fetch
       [my-branch] $ git rebase origin/main
       [my-branch] $ git push -f
       # then merge
       ```

       This results in a branch that can be applied directly to the end of the
       main branch and results in a very simple history.

       *(Note: This strategy is better suited for projects with short-running
       branches. Otherwise it might be better to occassionally merge the
       main branch instead of rebasing onto it.)*

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

## Pull Requests

On most projects, you will typically use the source control platform (e.g. Github, Bitbucket, Azure DevOps)
to merge branches through pull requests, rather than using the `git merge` command in a terminal.
Pull requests should contain all the information necessary for another person to quickly understand,
test, and review the code changes. We _strongly_ encourage the use of pull request templates, so that
your entire team can create consistent pull requests that include all of the necessary information.
A good pull request will typically include the following:

* A summary of what the changes are and why they are being made
* Testing instructions
* Link(s) to any related stories or tickets
* Screenshots or screen recordings for UI/UX changes
* A checklist for the creator to ensure any required steps are taken (e.g. running tests)

🤓 Leverage CI/CD for your projects whenever possible in order to reduce the
manual effort needed for pull request reviews (e.g. run linters and tests, deploy preview environments).
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

* Prefer [lightweight tags](http://git-scm.com/book/en/v2/Git-Basics-Tagging#Lightweight-Tags) for personal use, such as to bookmark commits
  for future reference.
