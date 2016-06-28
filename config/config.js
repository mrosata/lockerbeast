/**
 * Created by michael on 6/17/16.
 */
/* jshint node: true */

const config = {
  firebase: {
    apiKey: "AIzaSyDCbFPKkkUsPprGyeXRfciTLmqTG9A1msw",
    authDomain: "amber-torch-23.firebaseapp.com",
    databaseURL: "https://amber-torch-23.firebaseio.com",
    storageBucket: "amber-torch-23.appspot.com"
  },

  instagram: {
    clientId	:'1ae330bbefe9438b9a95db2a58ba5982',
    websiteUrl:	'www.lockerbeast.com',
    apiUrl: 'https://api.instagram.com/v1',
    redirectUri:	{
      production: 'www.lockerbeast.com/welcome/auth',
      development: 'http://localhost:4200/welcome/auth',
      test: 'http://localhost:4200/welcome/auth'
    },
    authUrl: 'https://api.instagram.com/oauth/authorize'
    //?client_id=CLIENT-ID&redirect_uri=REDIRECT-URI&response_type=token'
  }
};

module.exports = config;
