micro-frontend-events-portal
====================

[![codecov - Unit test Coverture](https://codecov.io/gh/rproenza86/micro-frontend-events-portal/branch/master/graph/badge.svg)](https://codecov.io/gh/rproenza86/micro-frontend-events-portal)
[![Build Status](https://travis-ci.org/rproenza86/micro-frontend-events-portal.svg?branch=master)](https://travis-ci.org/rproenza86/micro-frontend-events-portal)
[![CodeFactor](https://www.codefactor.io/repository/github/rproenza86/micro-frontend-events-portal/badge)](https://www.codefactor.io/repository/github/rproenza86/micro-frontend-events-portal)
[![DeepScan grade](https://deepscan.io/api/teams/5543/projects/7383/branches/73646/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=5543&pid=7383&bid=73646)
![GitHub](https://img.shields.io/github/license/rproenza86/micro-frontend-events-portal)

NPM package to enable communications between independents web applications such as micro ui/frontend web app.

> [Semi-auto generated code documentation](https://rproenza86.github.io/micro-frontend-events-portal/)

NPM Publish Job
---------------

`npm link`
----------

A consumer codebase can `npm link` all web app repos, by adding a script to `package.json` such as this:

```
"link-all": "dr-activities-shared link",
```

Executing `npm run link-all` would then:

1. For each activity repo:

```
npm ci
npm build
npm link
```

2. For the consumer codebase, and for each activity repo:

```
npm link @rproenza/events-portal
```

>*To include additional activity repos to be linked, append the activity name [here in `npm-link.sh`](./npm-link.sh#L16 "./npm-link.sh#L16").*

Troubleshooting
---------------

Maintainer
----------

Primary maintainer: Raúl Rodríguez Proenza

Core Contributors
-----------------

* Raúl Rodríguez Proenza

Collaboration
-------------

* PRs require at least one reviewer's approval.
* Ultimate responsibilty for merging PRs rests with submitter after receiving approval.  However, as a courtesy the reviewer
  should merge the PR after reviewing and delete the branch.
