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
  },
  // agentName: function(agent) {
  //   Meteor.subscribe('agent', agent);
  //   // let thisAgent = Meteor.users.findOne(agent);
  //   // Session.set('agent_', thisAgent);
  // }
  agentName: function(agent) {
    console.log(agent);
    let self = this;
    self.agentName = new ReactiveVar();
    Meteor.call('findUserById', agent, function(error, response) {
      if (error) {
        console.log(error);
      } else {
        self.agentName.set(response.profile.name);
      }
    })
  }
});

Template.dashboardLayout.events({
  'click .resend-verification-link' (event, template) {
    Meteor.call( 'sendVerificationLink', (error, response ) => {
      if ( error ) {
        Bert.alert( error.reason, 'danger' );
      } else {
        let email = Meteor.user().emails[0].address;
        Bert.alert( `Verification sent to ${ email }!`, 'success' );
      }
    });
  }
});
