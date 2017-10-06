# Front-end Boilerplate

Default structure for initializing front-end only projects, built with [Gulp](http://nodejs.org) and [Bower](http://bower.io).


## Requirements

- [Node.js](http://nodejs.org)
- Patience and a lot of coffee


## Initializing

1. Create your project folder and navigate to it.
2. Download the project tarball
`curl -sL https://github.com/omochidev/front-end-boilerplate/tarball/master | tar xz --strip-components 1`
3. Run `npm install` so all packages will be installed.
4. If you did not see bower downloading it packages, run it manually with `npm run postinstall`.


## Development

1. Run `npm start`, so the files will be watched for modifications and a server will be up at http://localhost:3000
2. Enjoy! And do your work, too.

When updating JS vendors, you will need to restart gulp.
