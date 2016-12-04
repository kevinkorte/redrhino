import { Meteor } from 'meteor/meteor';

SERVER_AUTH_TOKEN = Random.secret();

Meteor.startup(() => {
  process.env.MAIL_URL = Meteor.settings.private.mailUrl;

});
