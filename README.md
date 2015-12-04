# testcafe-reporter-list
[![Build Status](https://travis-ci.org/DevExpress/testcafe-reporter-list.svg)](https://travis-ci.org/DevExpress/testcafe-reporter-list)

This is the **list** reporter plugin for [TestCafe](http://devexpress.github.io/testcafe).

<p align="center">
    <img src="https://raw.github.com/DevExpress/testcafe-reporter-list/master/media/preview.png" alt="preview" />
</p>

## Install

```
npm install -g testcafe-reporter-list
```

## Usage

When you run tests from the command line, specify the reporter name by using the `--reporter` option:

```
testcafe chrome 'path/to/test/file.js' --reporter list
```


When you use API, pass the reporter name to the `reporter()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('chrome')
    .reporter('list') // <-
    .run();
```

## Author
Developer Express Inc. (https://devexpress.com)