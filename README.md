# express-hbs-segment

## Install
```
npm i --save handlebars-segment
```

## Usage
```javascript
var segment = require('express-hbs-segment');

segment.configure({
  cwd: process.cwd(),
  directories: ['app/segment/*', 'lib/segment/*'],
  handlebars: require('handlebars')
});
```

```
{{segment id="latest_news" limit=5}}
```
