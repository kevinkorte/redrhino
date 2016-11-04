import { Meteor } from 'meteor/meteor';

SERVER_AUTH_TOKEN = Random.secret();

Meteor.startup(() => {
  process.env.MAIL_URL = Meteor.settings.private.mailUrl;

  // SSR.compileTemplate('htmlEmail', Assets.getText('html-email.html'));
  //
  // var emailData = {
  //   name: "Doug Funnie",
  //   favoriteRestaurant: "Honker Burger",
  //   bestFriend: "Skeeter Valentine",
  // };
  //
  // Email.send({
  //   to: "kevinkorte15@gmail.com",
  //   from: "from.address@email.com",
  //   subject: "Example Email",
  //   html: SSR.render('htmlEmail', emailData),
  // });
});
