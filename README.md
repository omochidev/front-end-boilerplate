# Front-end Boilerplate

Default structure for initializing front-end only projects


## Requirements

[Node.js](http://nodejs.org), just download the file. Or you can install by command line following the steps here: https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager

[Harp](http://harpjs.com), install by: `npm install -g harp`

[Gulp](http://gulpjs.com), install by: `npm install -g gulp`


## Initializing

Install all requirements and run `npm install`


## Development

Run `gulp`

And you're ready to code.

When updating CSS/JS plugins, you will need to restart the server.


## Deploy

First, create a secrets.json like this:

```
{
  "folders": [
    "www/**"
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
