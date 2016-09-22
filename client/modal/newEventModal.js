Template.newEventModal.onRendered(function() {
  this.autorun(function () {
    if (GoogleMaps.loaded()) {
      $('.js-geocomplete-input').geocomplete({ details: "form" })
    }
  })
})
