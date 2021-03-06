// let interval = Meteor.setInterval(function() {
//     console.log(activeAt, 'logging time');
// }, 1000);
// console.log(interval);

Template.eventLayout.helpers({
  viewing: ()=> {
      var id = FlowRouter.getParam('id');
      return Viewings.findOne({_id: id});
  },
  // getAgentName() {
  //   let agent = Session.get('agent');
  //   console.log(agent);
  //   console.log(agent.profile.name);
  //   if (agent) {
  //     return agent.profile.name;
  //   }
  //   // return Meteor.users.findOne(agent).profile.name;
  // },
  events() {
    let events = Events.find({}, {sort: {timestamp: -1}});

    if ( events ) {
      return events;
    }
  },
  // countdownUntilEnd: function(activeAt, endTime) {
  //   console.log('activeAt', activeAt, endTime);
  // },
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
        zoom: 17,
        gestureHandling: 'cooperative'
      };
    }
  },
});

Template.eventLayout.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
});

Template.eventLayout.onRendered(function() {
  GoogleMaps.ready('exampleMap', function(map) {
    // Add a marker to the map once it's ready
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance,
      draggable:true,
    });
  });
  var id = FlowRouter.getParam('id');
  var author = FlowRouter.getParam('author');
  Meteor.call('findUserById', author, function(error,response){
    if(error) {
      console.log(error.reason)
    } else {
      Session.set("agent", response);
    }
  });
  let loadTimes = (id) => {
    return new Promise( (resolve, reject) => {
      Meteor.call('getStartTime', id, function(error, response) {
        if (error) {
          console.log(error.response);
        } else if (response.startTime) {
          console.log(response);
          $('#datetimepickerStart').datetimepicker({
            defaultDate: response.startTime
          });
          let startTime1 = response.startTime;
          console.log('calling get end time');
          Meteor.call('getEndTime', id, function(error, response) {
            if (error) {
              console.log('get end time error');
              reject(error);
            } else if (response.endTime) {
              console.log('response end time');
              $('#datetimepickerEnd').datetimepicker({
                defaultDate: response.endTime
              });
              resolve(startTime1);
            } else {
              console.log('response no time');
              $('#datetimepickerEnd').datetimepicker({
                useCurrent: false //Important! See issue #1075
              });
              resolve(startTime1);
            }
          });
        } else {
          $('#datetimepickerStart').datetimepicker({});
          Meteor.call('getEndTime', id, function(error, response) {
            if (error) {
              reject(error);
            } else if (response.endTime) {
              console.log('response endTime');
              $('#datetimepickerEnd').datetimepicker({
                defaultDate: response.endTime
              });
              resolve(response);
            } else {
              console.log('else');
              $('#datetimepickerEnd').datetimepicker({
                useCurrent: false //Important! See issue #1075
              });
              resolve(response);
            }
          });
        }
      });
    });
  }
  loadTimes(id).then((response) => {
    let thisDate = moment(response);
    console.log(thisDate);
    $('#datetimepickerEnd').data("DateTimePicker").minDate(thisDate);
    $("#datetimepickerStart").on("dp.change", function (e) {
      $('#datetimepickerEnd').data("DateTimePicker").minDate(e.date);
      let updateStartDateTime = e.date._d;
      Meteor.call('updateStartDateTime',id, updateStartDateTime, function(error, response) {
        if (error) {
          console.log(error);
        } else {
          console.log('datetimepickerStart on change');
        }
      });
    });
    $("#datetimepickerEnd").on("dp.change", function (e) {
      console.log('end');
      let updateEndDateTime = e.date._d;
      Meteor.call('updateEndDateTime', id, updateEndDateTime, function(error, response) {
        if (error) {
          console.log(error);
        } else {
          console.log('update end time');
        }
      })
    })
  }).catch( (error) => {
    console.log(error);
  });

//   $(function () {
//         let id = FlowRouter.getParam('id');
//         Meteor.call('getStartTime', id, function(error, response) {
//           if (error) {
//             console.log(error.response);
//           } else if (response.startTime) {
//             console.log(response);
//             $('#datetimepickerStart').datetimepicker({
//               defaultDate: response.startTime
//             });
//           } else {
//             $('#datetimepickerStart').datetimepicker({});
//           }
//         });
//         Meteor.call('getEndTime', id, function(error, response) {
//           if (error) {
//             console.log(error.response);
//           } else if (response.endTime) {
//             console.log(response);
//             $('#datetimepickerEnd').datetimepicker({
//                 useCurrent: false, //Important! See issue #1075
//                 defaultDate: response.endTime
//             });
//
//           } else {
//             console.log('that');
//             $('#datetimepickerEnd').datetimepicker({
//                 useCurrent: false //Important! See issue #1075
//             });
//           }
//         });
//
//         $("#datetimepickerStart").on("dp.change", function (e) {
//     $('#datetimepickerEnd').data("DateTimePicker").minDate(e.date);
// });

        // $("#datetimepickerStart").on("dp.change", function (e) {
        //   let dateTime = e.date._d;
        //   let id = FlowRouter.getParam('id');
        //   console.log(dateTime, "dateTime");
        //   // Meteor.call('updateDateTime', id, dateTime, function(error,response) {
        //   //   if (error) {
        //   //     console.log(error.reason);
        //   //   }
        //   // });
        //   $('#datetimepickerEnd').data("DateTimePicker").minDate(e.date);
        // });
        // $("#datetimepickerEnd").on("dp.change", function (e) {
        //     $('#datetimepickerStart').data("DateTimePicker").maxDate(e.date);
        // });
    // });
});

Template.eventLayout.events({
  'submit .add-follower-email'(event) {
    event.preventDefault();
    $('#send-invite').addClass('loading');
    let followerEmail = event.target.email.value;
    let authorId = FlowRouter.getParam('author');
    let id = FlowRouter.getParam('id');
    Meteor.call('prepareEmailToFollower', followerEmail, authorId, id, function(error,response) {
      if (error) {
        //better error handling here
        Bert.alert( "Good news, you've already sent them an email", 'warning', 'growl-top-right' );
        $('#send-invite').removeClass('loading');
      } else {
        Bert.alert( "WooHoo, the email is on its way!", 'success', 'growl-top-right' );
        $('#send-invite').removeClass('loading');
      }
    })
  },
  'click .js-check-in'(event) {
    $('.js-check-in').addClass('loading massive');
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
  },
  'click .js-start-timer'(event) {
    event.preventDefault();
    console.log(event);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        let accuracy = position.coords.accuracy;
        let timestamp = position.timestamp;
        let id = FlowRouter.getParam('id');
        Meteor.call('startEventTime', lat, lng, accuracy, timestamp, id, function(error, response) {
          if ( error) {
            Bert.alert( error.reason, "warning" );
          } else {
            consol.log(response);
          }
        });
      });
    }
  }
})
