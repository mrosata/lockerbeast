import Em from 'ember';
import config from 'lockerbeast/config/environment';

// The instagram implicit flow will redirect back to a route that handles
// auth. The component doesn't handle the auth but rather sets up the
// links to begin the implicit auth flow.
const instagram = config.torii.providers.instagram;
const implicitFlowURI =
        `${instagram.authUrl}/?client_id=${instagram.appId}\
        &redirect_uri=${instagram.redirectUri}&response_type=token`.replace(/\s+/gm, '');

export default Em.Component.extend({
  buttonClasses: 'btn btn-outline',

  providers: [
    Em.Object.create({
      name: 'instagram',
      url: implicitFlowURI,
      buttonText: 'Sign In-stagram!',
      classString: 'btn btn-outline instagram'
    })]
});
