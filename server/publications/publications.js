//Publish this users details
Meteor.publish('this.user', function() {
  return Meteor.users.find({_id: this.userId}, {fields: {
    customerId: 1,
    subscription: 1,
  }});
});

Meteor.publish('viewings.single', function(id) {
    check(id, String);
    return Viewings.find({_id: id});
});
