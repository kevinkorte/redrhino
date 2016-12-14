//Publish this users details
Meteor.publish('this.user', function() {
  return Meteor.users.find({_id: this.userId}, {fields: {
    customerId: 1,
    subscription: 1,
    createdAt: 1
  }});
});

Meteor.publish('viewings.single', function(id) {
    check(id, String);
    return Viewings.find({_id: id});
});

Meteor.publish('myDashboard', function() {
  var user = Meteor.users.findOne(this.userId);
  return Viewings.find({"followersEmail": user.emails[0].address})
});

Meteor.publish('myUpcoming', function() {
  // var user = Meteor.users.findOne(this.userId);
  return Viewings.find({author: this.userId});
});

Meteor.publish('events', function(id) {
  check(id, String);
  return Events.find({viewingId: id}, {sort: {timestamp: -1}});
});
