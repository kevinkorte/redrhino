Template.body.onCreated(function() {
  Meteor.subscribe('this.user');
});
