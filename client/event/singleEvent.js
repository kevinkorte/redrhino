Template.eventLayout.helpers({
  viewing: ()=> {
      var id = FlowRouter.getParam('id');
      return Viewings.findOne({_id: id});
  },
  agent() {
    return Session.get("agent");
  },
  events() {
    let events = Events.find();

    if ( events ) {
      return events;
    }
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
  },
  'click .js-check-in'(event) {
    $('.js-check-in').addClass('loading');
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        let accuracy = position.coords.accuracy;
        let timestamp = position.timestamp;
        let id = FlowRouter.getParam('id');
        Meteor.call('addEvent', lat, lng, accuracy, timestamp, id, function(error, response) {
          if ( error && error.error === "add-event" ) {
            Bert.alert( error.reason, "warning" );
            $('.js-check-in').removeClass('loading');
          } else {
            $('.js-check-in').removeClass('loading');
          }
        });
      });
    }
  }
})
