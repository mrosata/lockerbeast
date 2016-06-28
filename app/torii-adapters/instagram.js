import Em from 'ember';
import config from 'lockerbeast/config/environment';

const instagram = config.torii.provider.instagram;
const implicitFlowURI =
        `${instagram.authUrl}/?client_id=${instagram.appId}\
        &redirect_uri=${instagram.redirectUri}&response_type=token`.replace(/\s+/gm, '');

export default Em.Object.extend({
  open: function(authentication){
    var accessToken = authentication.accessToken;
    
  },


  fetch() {
    
  }
});
