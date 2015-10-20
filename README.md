express-hbs-segment
===================
[![Code Climate](https://codeclimate.com/github/MrBoolean/express-hbs-segment/badges/gpa.svg)](https://codeclimate.com/github/MrBoolean/express-hbs-segment) [![Test Coverage](https://codeclimate.com/github/MrBoolean/express-hbs-segment/badges/coverage.svg)](https://codeclimate.com/github/MrBoolean/express-hbs-segment) [![Build Status](https://travis-ci.org/MrBoolean/express-hbs-segment.svg?branch=master)](https://travis-ci.org/MrBoolean/express-hbs-segment) [![Dependency Status](https://gemnasium.com/MrBoolean/express-hbs-segment.svg)](https://gemnasium.com/MrBoolean/express-hbs-segment) [![npm](https://img.shields.io/npm/v/express-hbs-segment.svg)](https://npmjs.org/express-hbs-segment)

`express-hbs-segment` takes care of recurring elements (called segments or fragments) for your application. Sometimes, the [`express-hbs`](https://github.com/barc/express-hbs) [_partial_](http://handlebarsjs.com/partials.html) behaviour is not the best opportunity. Maybe the [_partial_](http://handlebarsjs.com/partials.html) should load its own data or simply accept a bunch of configuration attributes. At this point `express-hbs-segment` is a good choice. The built-in `example/` directory gives you a short instruction.

## Install
[![NPM](https://nodei.co/npm/express-hbs-segment.png?downloads=true)](https://nodei.co/npm/eexpress-hbs-segment/)

```
npm i --save express-hbs-segment
```

## Usage
```javascript
var hbs = require('express-hbs');
var segment = require('express-hbs-segment');

segment.configure({
  cwd: process.cwd(),
  directories: ['app/segment/*', 'lib/segment/*'],
  handlebars: hbs
});
```

```handlebars
{{segment id="latest_news" limit=5 category=1337 title="Latest News"}}
```

## Create a segment
Creating segments is really easy. Just add a folder (e.g. _latest-news_) and create a `.hbs` and `.js` file with the same name (in this example: _latest-news_) in it.

The segment controller **must** returns a `bluebird` Promise instance. The data passed to the resolve-function will be forwarded to the hbs template.

```javascript
var Promise = require('bluebird');

module.exports = function latestNews(options) {
  return Promise.resolve({
    options: options
  });
};
```

_The above shown example forwards the obtained options object to the view._

## FAQ
### Is there a reason why this modules depend on `express-hbs`?
Unfortunately, the module `handlebars` does not support an asynchronous helper workflow. However, `express-hbs` comes with a method called `registerAsyncHelper` which takes care of the above-mentoined process.