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
  },
  prepareEmailToFollower(followerEmail, authorId, id) {
    check(followerEmail, String);
    check(authorId, String);
    check(id, String);
    if (followerEmail && authorId && id) {
      Meteor.call('sendEmailToFollower', followerEmail, authorId, id, function(error, response) {
        if (error) {
          //better error handling here
          console.log('email error');
          console.log(error);
        } else {
          console.log('email');
          console.log(response);
        }
      })
    }
  },
  // ToDo: Format sending Email better
  sendEmailToFollower(followerEmail, authorId, id) {
    check(followerEmail, String);
    check(authorId, String);
    check(id, String);
    Email.send({
      to: followerEmail,
      from: 'kevinkorte15@gmail.com',
      subject: "You've been asked to follow this viewing",
      text: 'Here is some test text. Check it out at'
    });
  }
});
