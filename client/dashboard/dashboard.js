Template.dashboardLayout.helpers({
  viewings: function() {
    // var user = Meteor.users.findOne(Meteor.user());
    if (Meteor.user()) {
      let email = Meteor.user().emails[0].address;
      return Viewings.find({"followersEmail": email});
    }
  }
})
