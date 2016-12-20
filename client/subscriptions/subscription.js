Template.body.onCreated(function() {
  Meteor.subscribe('this.user');
});

Template.eventLayout.onCreated(function() {
    var self = this;
    self.autorun(function() {
        var id = FlowRouter.getParam('id');
        self.subscribe('viewings.single', id);
    });
});

Template.dashboardLayout.onCreated(function() {
  let self = this;
  self.autorun(function() {
    self.subscribe('myDashboard');
  });
});

Template.upcoming.onCreated(function() {
  let self = this;
  self.autorun(function() {
    self.subscribe('myUpcoming');
  });
});

Template.eventLayout.onCreated(function() {
  var self = this;
  self.autorun(function() {
      var id = FlowRouter.getParam('id');
      self.subscribe('events', id);
  });
});

Template.publicEventLayout.onCreated(function() {
  var self = this;
  self.autorun(function() {
      var id = FlowRouter.getParam('id');
      self.subscribe('events', id);
  });
});

Template.publicEventLayout.onCreated(function() {
    var self = this;
    self.autorun(function() {
        var id = FlowRouter.getParam('id');
        self.subscribe('viewings.single', id);
    });
});
