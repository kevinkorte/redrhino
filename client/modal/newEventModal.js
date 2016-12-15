Template.newEventModal.onRendered(function() {
  this.autorun(function () {
    if (GoogleMaps.loaded()) {
      $('.js-geocomplete-input').geocomplete({ details: "form" })
    }
  })
});

Template.newEventModal.events({
  'submit .form-new-viewing'(event, template) {
    event.preventDefault();
    var address = event.target[0].value;
    var lat = event.target[1].value;
    var lng = event.target[2].value;
    console.log(address, lat, lng);
    Meteor.call('addNewViewing', address, lat, lng, function(error, result) {
      if (error) {
        Bert.alert( error.reason, 'danger', 'fixed-top', 'fa-frown-o' );
      }
      $('.modal-backdrop').remove();
      FlowRouter.go('/'+Meteor.userId()+'/'+result);
    });
  }
    // Viewings.insert({address: address, lat: lat, lng: lng}, function(error, result) {
    //   $('.modal-backdrop').remove();
    //   FlowRouter.go('/'+Meteor.userId()+'/'+result);
    // });
  })
