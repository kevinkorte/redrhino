Avatar.setOptions({
  imageSizes: {
    'account': 120,
    'navigation': 36,
    'card': 30
  }
});

Template.accountsMenu.events({
  'click .js-logout'(event) {
    event.preventDefault();
    Meteor.logout();
  }
})
