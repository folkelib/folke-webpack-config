# folke-webpack-config
A default webpack configuration.

## Usage:
Browse to your source directory.

```
npm init
npm install webpack typings folke-webpack-config --save-dev
typings init
```

Create a ``webpack.config.js`` file with this line inside:

```
module.exports = require("folke-webpack-config");
```

Edit your ``package.json`` file. Your ``script`` section should look like this:

```
"scripts": {
    "prepublish": "typings install && webpack",
    "build": "webpack",
    "watch": "webpack -w"
  }
```
