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
    console.log(event.target.address.val);
    // var address = event.target.address.val;
    // var lat = event.target.lat.val;
    // var lng = event.target.lng.val;
    // Viewings.insert({address: address, lat: lat, lng: lng}, function(error, result) { console.log(result) });
  }
})
