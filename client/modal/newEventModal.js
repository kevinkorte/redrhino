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
    console.log(event.target[0].value);
    var address = event.target[0].value;
    var lat = event.target[1].value;
    var lng = event.target[2].value;
    Viewings.insert({address: address, lat: lat, lng: lng}, function(error, result) { console.log(error) });
  }
})
