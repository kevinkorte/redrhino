Template.publicEventLayout.helpers({
  viewing: ()=> {
      var id = FlowRouter.getParam('id');
      return Viewings.findOne({_id: id});
  },
  getAgent(agent) {
    console.log(agent);
    return Meteor.users.findOne(agent).profile.name;
  },
  events() {
    let events = Events.find({}, {sort: {timestamp: -1}});

    if ( events ) {
      return events;
    }
  },
  publicEventMapOptions: function() {
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
  }
});

Template.publicEventLayout.onRendered(function() {
  GoogleMaps.ready('publicEventMap', function(map) {
    // Add a marker to the map once it's ready
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance,
      draggable:true,
    });
    console.log(marker);
  });
  var author = FlowRouter.getParam('author');
  Meteor.call('findUserById', author, function(error,response){
    if(error) {
      console.log(error.reason)
    } else {
      Session.set("agent", response);
    }
  });
});
