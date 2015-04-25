var harp = require('harp');

harp.server(__dirname, { port: process.env.PORT || 9000 });

console.log('Listening at http://localhost:9000');
