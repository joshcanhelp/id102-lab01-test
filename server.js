require('dotenv').config();
const express = require('express');
const http = require('http');
const morgan = require('morgan');

const appUrl = `http://localhost:${process.env.PORT}`;

if ('https://YOUR_TENANT_NAME.auth0.com' === process.env.ISSUER_BASE_URL) {
  console.log('Looks like you need to add your domain the ISSUER_BASE_URL in the .env file.');
  console.log('Go ahead and do that real quick and try `npm start` again!');
  process.exit();
}

if ('https://' !== process.env.ISSUER_BASE_URL.substring(0, 8)) {
  console.log('Uh oh! Looks like the ISSUER_BASE_URL in the .env file is not a URL.');
  console.log('Maybe you need to add "https://"?');
  console.log('Give that a try and then run `npm start` again!');
  process.exit();
}

if ('YOUR_CLIENT_ID' === process.env.CLIENT_ID) {
  console.log('Looks like you need to add your Client ID the CLIENT_ID in the .env file.');
  console.log('Go ahead and do that real quick and try `npm start` again!');
  process.exit();
}

// Exerise 1, step 7: uncomment the line below
// const { auth } = require('express-openid-connect');

const app = express();
app.set('view engine', 'ejs');
app.use(morgan('combined'));

// Exerise 1, step 8: uncomment the lines below
// app.use(auth({
//  auth0Logout: true,
//  baseURL: appUrl
// }));

app.get('/', (req, res) => {
  res.render('home',  { user: req.openid && req.openid.user });
});

app.get('/expenses', (req, res) => {
  res.render('expenses', {
    expenses: [
      {
        date: new Date(),
        description: 'Coffee for a Coding Dojo session.',
        value: 42,
      }
    ]
  });
});

http.createServer(app).listen(process.env.PORT, () => {
  console.log(`listening on ${appUrl}`);
});
