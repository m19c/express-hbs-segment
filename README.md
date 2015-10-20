# handlebars-segment

## Install
```
npm i --save handlebars-segment
```

## Usage
```javascript
var segment = require('handlebars-segment');

segment.configure({
  cwd: process.cwd(),
  directories: ['app/segment/*', 'lib/segment/*'],
  handlebars: require('handlebars')
});
```

```
{{segment id="latest_news" config="{ limit: 5 }"}}
```
