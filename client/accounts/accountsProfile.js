Template.accountsProfile.events({
  'submit .name': function(event) {
    event.preventDefault();
    $('.js-update-name').addClass('loading');
    let profileName = $('#profileName').val();
    let user = Meteor.userId();
    Meteor.call('updateProfileName', user, profileName, function(error, response) {
      if (error) {
        console.log(error.message);
      }
    })
    $('.js-update-name').removeClass('loading');
  }
})
