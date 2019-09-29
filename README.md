<h1
    align="center">
    micro-frontend-events-portal
</h1>
<span
    align="center">

[![codecov - Unit test Coverture](https://codecov.io/gh/rproenza86/micro-frontend-events-portal/branch/master/graph/badge.svg)](https://codecov.io/gh/rproenza86/micro-frontend-events-portal)
[![Build Status](https://travis-ci.org/rproenza86/micro-frontend-events-portal.svg?branch=master)](https://travis-ci.org/rproenza86/micro-frontend-events-portal)
[![CodeFactor](https://www.codefactor.io/repository/github/rproenza86/micro-frontend-events-portal/badge)](https://www.codefactor.io/repository/github/rproenza86/micro-frontend-events-portal)
[![DeepScan grade](https://deepscan.io/api/teams/5543/projects/7383/branches/73646/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=5543&pid=7383&bid=73646)
[![codebeat badge](https://codebeat.co/badges/872bb768-f599-4e13-8ed4-15a39132a633)](https://codebeat.co/projects/github-com-rproenza86-micro-frontend-events-portal-master)
[![BCH compliance](https://bettercodehub.com/edge/badge/rproenza86/micro-frontend-events-portal?branch=master)](https://bettercodehub.com/)
![GitHub](https://img.shields.io/github/license/rproenza86/micro-frontend-events-portal)

</span>

<hr/>

> Technology agnostic web applications Communication System. Web Events API foundations.

<hr/>

`micro-frontend-events-portal` is an NPM package inspired by the need of Micro UI/FrontEnd apps to communicate between each other in a loosely fashion.

Micro UI/FrontEnd apps are independents web applications which keeps communications and coupling to a minimum an solves business requirements independently.

## Getting Started

These instructions will show how to install the package and start using it.

If you are interested in the details implementation you can check the [Semi-auto generated code documentation](https://rproenza86.github.io/micro-frontend-events-portal/) or the [source code](https://github.com/rproenza86/micro-frontend-events-portal).

### Prerequisites

Basic understanding about how to work with `es modules` and `commonjs` modules.

Basic knowledge about `npm link` use to work with this project locally without to install it on its consumers apps.

### Installing

Install the package into your project.

```bash
npm install @rproenza/micro-frontend-events-portal
```

### How to use

#### Example (es module)

```js
 import { AppsPortal } from '@rproenza/micro-frontend-events-portal';

 // Create portals controller
 const appsPortal = new AppsPortal();

 // Register app into the portals controller
 const appAEventPortal = appsPortal.registerApp(registrationObjectAppA);
 // Subscribe app to events of interest
 appAEventPortal
    .listenEvent('EVENT_APP_B-ADDED-Bss') // => appAEventPortal is now listening for 'EVENT_APP_B-ADDED-Bss' events
    .listenEvent('EVENT_APP_B-DELETED-Bss'); // => appAEventPortal is now listening for 'EVENT_APP_B-DELETED-Bss' events

 // Register app into the portals controller
 const appBEventPortal = appsPortal.registerApp(registrationObjectAppB);
 // Subscribe app to events of interest
 appBEventPortal
    .listenEvent('EVENT_APP_A-ADDED-Ass') // => appBEventPortal is now listening for 'EVENT_APP_A-ADDED-Ass' events
    .listenEvent('EVENT_APP_A-DELETED-Ass'); // => appBEventPortal is now listening for 'EVENT_APP_A-DELETED-Ass' events

 // Publishing apps events
 appAEventPortal.notifyEvent('EVENT_APP_A-ADDED-Ass', eventPayload); // => appBEventPortal is notified about the 'EVENT_APP_A-ADDED-Ass' event
 appBEventPortal.notifyEvent('EVENT_APP_B-DELETED-Bss', eventPayload); // => appAEventPortal is notified about the 'EVENT_APP_B-DELETED-Bss event

 const appANotifiedLogs = appsPortal.logs.getAppNotifiedEvents(appAName);
 /**
  * => appANotifiedLogs =
  *         {
  *            'EVENT_APP_B-DELETED-Bss': [{eventDetailObject}], // Events notified
  *        }
  */
 const appBPublishedLogs = appsPortal.logs.getAppPublishedEvents(appBName);
 /**
  * => appBPublishedLogs =
  *         {
  *            'EVENT_APP_A-ADDED-Ass': [{eventDetailObject}], // Events notified
  *        }
  */
```

#### Example (commonjs)

```js
 var AppsPortal = require('@rproenza/micro-frontend-events-portal').AppsPortal;

 // Create portals controller
 var appsPortal = new AppsPortal();

 // Register app into the portals controller
 var appAEventPortal = appsPortal.registerApp(registrationObjectAppA);
 // Subscribe app to events of interest
 appAEventPortal
    .listenEvent('EVENT_APP_B-ADDED-Bss') // => appAEventPortal is now listening for 'EVENT_APP_B-ADDED-Bss' events
    .listenEvent('EVENT_APP_B-DELETED-Bss'); // => appAEventPortal is now listening for 'EVENT_APP_B-DELETED-Bss' events

 // Register app into the portals controller
 var appBEventPortal = appsPortal.registerApp(registrationObjectAppB);
 // Subscribe app to events of interest
 appBEventPortal
    .listenEvent('EVENT_APP_A-ADDED-Ass') // => appBEventPortal is now listening for 'EVENT_APP_A-ADDED-Ass' events
    .listenEvent('EVENT_APP_A-DELETED-Ass'); // => appBEventPortal is now listening for 'EVENT_APP_A-DELETED-Ass' events

 // Publishing apps events
 appAEventPortal.notifyEvent('EVENT_APP_A-ADDED-Ass', eventPayload); // => appBEventPortal is notified about the 'EVENT_APP_A-ADDED-Ass' event
 appBEventPortal.notifyEvent('EVENT_APP_B-DELETED-Bss', eventPayload); // => appAEventPortal is notified about the 'EVENT_APP_B-DELETED-Bss event

 var appANotifiedLogs = appsPortal.logs.getAppNotifiedEvents(appAName);
 /**
  * => appANotifiedLogs =
  *         {
  *            'EVENT_APP_B-DELETED-Bss': [{eventDetailObject}], // Events notified
  *        }
  */
 var appBPublishedLogs = appsPortal.logs.getAppPublishedEvents(appBName);
 /**
  * => appBPublishedLogs =
  *         {
  *            'EVENT_APP_A-ADDED-Ass': [{eventDetailObject}], // Events notified
  *        }
  */
```

## Collaboration section

## Contributing

* PRs require at least one reviewer's approval.
* PRs require all automated checks have passed.
* Ultimate responsibility for merging PRs rests with submitter after receiving approval.  However, as a courtesy the reviewer
  should merge the PR after reviewing and delete the branch.

### Clone project

```bash
git clone https://github.com/rproenza86/micro-frontend-events-portal.git
```

### Running the tests

> Lint and unit test the project

```bash
npm run test
```

> Rebuild, run tests, then create and open the coverage report

```bash
npm run cov
```

### Deployment

One-step: clean, build, test, publish docs, and prep a release

```bash
# Prepare a standard release:
npm run prepare-release
```

This command runs the following tasks:

* `reset`: cleans the repo by removing all untracked files and resetting `--hard` to the latest commit. (**Note: this could be destructive.**)
* `test`: build and fully test the project
* `docs:html`: generate the latest version of the documentation
* `docs:publish`: publish the documentation to GitHub Pages
* `version`: bump package.json version, update CHANGELOG.md, and git tag the release

When the script finishes, it will log the final command needed to push the release commit to the repo and publish the package on the `npm` registry:

```bash
git push --follow-tags origin master; npm publish
```

Look over the release if you'd like, then execute the command to publish everything.

You can also prepare a non-standard release:

```bash
# Or a non-standard release:

# Reset the repo to the latest commit and build everything
npm run reset && npm run test && npm run cov:check && npm run doc:html

# Then version it with standard-version options. e.g.:
# don't bump package.json version
npm run version -- --first-release
```

## Built With

* [Travis.ci](https://travis-ci.org/) - CI/CD service. Testing, deployment and release
* [Codecov](https://codecov.io) - Unit test Coverture, code review workflow and quality
* [CodeFactor](https://www.codefactor.io) - Automated code quality review
* [DeepScan](https://deepscan.io) -  Code review checks for runtime errors and quality issues
* [Codebeat](https://codebeat.co) - Automated code review help you prioritize issues find refactoring opportunities and identify quick wins in your applications
* [BetterCodeHub](https://bettercodehub.com) - Definition of Done for code quality

## Versioning

This project is tooled for [conventional changelog](https://github.com/conventional-changelog/conventional-changelog) to make managing releases easier. See the [standard-version](https://github.com/conventional-changelog/standard-version) documentation for more information on the workflow, or [`CHANGELOG.md`](CHANGELOG.md) for an example.

## Authors

* **Raul R. Proenza**
  * [Github](https://github.com/rproenza86)
  * [RaulProenza.Page](https://raulproenza.page)
  * [Linkedin.com](https://www.linkedin.com/in/raulproenza/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* Inspired on [single-spa](https://single-spa.js.org) communication solution.
* At its core this application implements several Design Patterns and Principles such as:
  * GoF Design Pattern
    * Behavioral Patterns:
      * Observer
      * Strategy
      * Chain of responsibility
      * Command
      * Mediator
      * Template
    * Creational Patterns:
      * Factory method
  * GRASP Design Principles
    * Low coupling
    * Low Coupling
    * Controller
    * Polymorphism
    * Expert
    * Controlled variation
    * Creator
* This project is the result of the learning lessons and acquired experiences from the [event-distributor](https://github.com/rproenza86/events-distributor) project.
