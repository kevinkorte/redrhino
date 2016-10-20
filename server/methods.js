Meteor.methods({
  sendVerificationLink(userId) {
    if (userId) {
      console.log('send no lookup');
      return Accounts.sendVerificationEmail( userId );
    } else {
      console.log('send lookup');
      let userId = Meteor.userId();
      return Accounts.sendVerificationEmail( userId );
    }
  }
});
