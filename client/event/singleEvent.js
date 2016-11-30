Template.eventLayout.helpers({
  viewing: ()=> {
      var id = FlowRouter.getParam('id');
      return Viewings.findOne({_id: id});
  },
  agent() {
    return Session.get("agent");
  },
  exampleMapOptions: function() {
    // Make sure the maps API has loaded
    var id = FlowRouter.getParam('id');
    var event = Viewings.findOne({_id: id});

    if (GoogleMaps.loaded() && event) {
      // Map initialization options
      // var id = FlowRouter.getParam('id');

      var eventLat = Number(event.lat);
      var eventLng = Number(event.lng);
      return {
        center: new google.maps.LatLng(eventLat, eventLng),
        zoom: 17
      };
    }
  },
});

Template.eventLayout.onRendered(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('exampleMap', function(map) {
    // Add a marker to the map once it's ready
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance
    });
  });
  var id = FlowRouter.getParam('id');
  Meteor.call('findUserById', id, function(error,response){
    if(error) {
      console.log(error.reason)
    } else {
      Session.set("agent", response);
    }
  });
});

Template.eventLayout.events({
  'submit .add-follower-email'(event) {
    event.preventDefault();
    let followerEmail = event.target.email.value;
    let authorId = FlowRouter.getParam('author');
    let id = FlowRouter.getParam('id');
    Meteor.call('prepareEmailToFollower', followerEmail, authorId, id, function(error,response) {
      if (error) {
        //better error handling here
        console.log(error.reason);
      } else {
        console.log(response);
      }
    })
  }
})
