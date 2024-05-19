# less-json

An utility to inspect large JSON objects in the command line interactively using collapse/expand functionality.

For example:

```javascript
import lessJSON from 'less-json';

const responseJson = {
  hi: 'hello',
  who: [
    'world',
  ]
}

await lessJSON(responseJson)
```

The output will look like this:

```
  at functionName (file:///home/my-username/my-repo/my-source.js:9:9)
 |-  [+]
```

This output can be expanded interactively:

```
  at functionName (file:///home/my-username/my-repo/my-source.js:9:9)
 |-  [-]
  |- hi: hello
  |- who [-]
   |- 0: world
```
