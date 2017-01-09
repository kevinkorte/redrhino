import { Meteor } from 'meteor/meteor';


SERVER_AUTH_TOKEN = Random.secret();

Meteor.startup(() => {
  process.env.MAIL_URL = Meteor.settings.private.mailUrl;
  Kadira.connect(Meteor.settings.private.kadira.appId, Meteor.settings.private.kadira.appSecret);
});
