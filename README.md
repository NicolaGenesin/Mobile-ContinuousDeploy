#### Mobile-ContinuousDeploy

![](https://travis-ci.org/NicolaGenesin/Mobile-ContinuousDeploy.svg?branch=master)

![](http://s18.postimg.org/tf46ty0qh/Screen_Shot_2015_08_09_at_04_42_39.png)

##### Aim
Deploy your apk (android) or zip (ios) on Appetize.io (mobile web emulator).

ATM just a rough implementation.

##### Appetize Configuration

``` javascript
var pathToArtifact = '/physical/path/to/your/artifact.apk';
var urlLocation = 'https://remote/path/to/your/artifact.apk';
var token = 'tok_hdzewnreerpguzpyeccu4c4cvr';
var publicKey = '';
var privateKey = '';
var platform = 'android';
```

Simple helper to any CI (Jenkins, Teamcity, etc.) pipeline.

Every successfull build, the file watcher notice the change and pushes an update requesto to the web emulator.
Multiple watchers can be added in order to build on specific branches.
