# Contributing to Spectragram

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

The following is a set of guidelines for contributing to Spectragram, which is hosted on GitHub.
These are just guidelines, not rules, use your best judgment and feel free to propose changes to this document in a pull request.

## Code style

Regarding code style like indentation and whitespace, **follow the conventions you see used in the source already** and in the [jQuery JavaScript Style Guide](https://contribute.jquery.org/style-guide/js/)

## Modifying the code

First, ensure that you have the latest [Node.js](http://nodejs.org/) and [npm](http://npmjs.org/) installed.

1. Fork and clone the repo.
1. Run `npm install` to install all dependencies.
1. Make your modifications on `spectragram.js` file.
1. Run `npm run build` to lint the js and generate the minified version of this project.

Assuming that you don't see any red, you're ready to go. Just be sure to run `npm run build` after making any changes, to ensure that nothing is broken.

## Submitting pull requests

1. Create a new branch, please don't work in your `master` branch directly.
1. Fix stuff.
1. Run `npm run build` to see if the jshint pass. Repeat steps 2-3 until done.
1. Update the documentation to reflect any changes.
1. Push to your fork and submit a pull request.