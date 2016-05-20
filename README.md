# Front-end Boilerplate

Default structure for initializing front-end only projects


## Requirements

[Node.js](http://nodejs.org), just download the file. Or you can install by command line following the steps here: https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager

[Gulp](http://gulpjs.com), install by: `npm install -g gulp`


## Initializing

Run `npm install`


## Development

Run `gulp`

And you're ready to code. You will need to serve the `public` folder, so you can do by `node server.js` or configure another server that you may prefer.

When updating CSS/JS vendors, you will need to restart gulp.


## Deploy

First, create a secrets.json like this:

```
{
  "folders": [
    "public/**"
  ],
  "deploy": {
    "host": "ftp.site.com",
    "user": "user",
    "password": "password",
    "dest": "/var/public_html"
  },
  "deploy_production": {
    "host": "ftp.siteproduction.com",
    "user": "user",
    "password": "password",
    "dest": "/var/public_html"
  }
}
```

And then, run `gulp deploy`
