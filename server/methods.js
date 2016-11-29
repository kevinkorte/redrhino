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
  },
  findUserById(id) {
    check(id, String);
    if (id) {
      let event = Viewings.findOne(id);
      let userId = event.author;
      return Meteor.users.findOne(userId);
    } else {
      //need better error handling here
      console.log('error')
    }
  }
});
