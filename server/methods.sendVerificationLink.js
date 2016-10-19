Meteor.methods({
  sendVerificationLink(userId) {
    //let userId = Meteor.userId();
    console.log(userId);
    if ( userId ) {
      return Accounts.sendVerificationEmail( userId );
    }
  }
});
