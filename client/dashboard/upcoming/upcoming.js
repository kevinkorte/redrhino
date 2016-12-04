Template.upcoming.onRendered(function() {
  this.autorun(function () {
    if (GoogleMaps.loaded()) {
      $(".geolocation-input").geocomplete();
    }
  });
});

Template.upcoming.helpers({
  viewings: function() {
    return Viewings.find({author: Meteor.userId()});
  }
})
