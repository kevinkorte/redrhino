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
