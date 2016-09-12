Template.topbar.events({
  'click .js-new-btn'(event) {
    console.log(event);
  },
  'click .js-sign-out'(event) {
    Meteor.logout;
  }
})
