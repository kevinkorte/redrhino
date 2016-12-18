Meteor.setInterval(function() {
    Session.set("time", new Date().getTime());
}, 60000);

Template.dashboardLayout.helpers({
  viewings: function() {
    // var user = Meteor.users.findOne(Meteor.user());
    if (Meteor.user()) {
      let email = Meteor.user().emails[0].address;
      return Viewings.find({$or: [{"followersEmail": email},{author: Meteor.userId()}]}, {sort: {startTime: 1}});
    }
  },
  isOverdue: function(endTime) {
    Session.get("time");
    if (moment(endTime).isBefore(moment())) {
      return "isOverdue";
    };
  }
});
