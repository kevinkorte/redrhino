Template.upcoming.onRendered(function() {
  this.autorun(function () {
    if (GoogleMaps.loaded()) {
      $(".geolocation-input").geocomplete();
    }
  });
});
