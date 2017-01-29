Meteor.methods({
  sendVerificationLink() {
    let userId = Meteor.userId();
    return Accounts.sendVerificationEmail( userId );
  },
  findUserById(id) {
    check(id, String);
    if (id) {
      console.log(id, 'find user by id');
      let event = Viewings.findOne({author: id});
      console.log(event);
      let userId = event.author;
      console.log(Meteor.users.findOne(userId));
      return Meteor.users.findOne(userId);
    } else {
      //need better error handling here
      console.log('error')
    }
  },
  prepareEmailToFollower(followerEmail, authorId, id) {
    check(followerEmail, String);
    check(authorId, String);
    check(id, String);
    console.log(followerEmail);
    let emailAlreadyExist = Viewings.find({_id: id, followersEmail: {$in: [followerEmail]} }).count()>0;
    console.log(emailAlreadyExist);
    /*
    RETURNING TRUE BECAUSE USER IS THERE ON ANOTHER JOB, BUT NOT ON THIS JOB
    */
    if (!emailAlreadyExist) {
      Viewings.update(id, {$addToSet: {followersEmail: followerEmail}});
      if (followerEmail && authorId && id) {
        Meteor.call('sendEmailToFollower', followerEmail, authorId, id, function(error, response) {
          if (error) {
            //better error handling here
            console.log('email error');
            console.log(error);
          } else {
            console.log('email');
            console.log(response);
          }
        })
      }
    } else {
      throw new Meteor.Error(500, 'Error 500: Not found', 'The document is not found');
    }
  },
  // ToDo: Format sending Email better
  sendEmailToFollower(followerEmail, authorId, id) {
    check(followerEmail, String);
    check(authorId, String);
    check(id, String);
    console.log('follwerEmail', followerEmail);
    let agent = Meteor.users.findOne(authorId);
    SSR.compileTemplate('htmlEmail', Assets.getText('html-email.html'));

    var emailData = {
      followerEmail: followerEmail,
      agent: agent.profile.name,
      agentId: authorId,
      id: id,
    };

    Email.send({
      to: followerEmail,
      from: "from.address@email.com",
      subject: "Example Email",
      html: SSR.render('htmlEmail', emailData),
    });
  },
  addNewViewing(address, lat, lng) {
    check(address, String);
    check(lat, String);
    check(lng, String);
    var viewing = Viewings.insert({address: address, lat: lat, lng: lng});
    Meteor.call('saveToSearch', viewing);
    return viewing;
  },
  saveToSearch(viewing) {
    check(viewing, String);
    let viewingToSave = Viewings.findOne(viewing);
    var agent = Meteor.users.findOne({_id: viewingToSave.author});
    var agentName = agent.profile.name;
    var client = AlgoliaSearch(Meteor.settings.public.algoliaAppId, Meteor.settings.private.algoliaPrivateKey);
    var index = client.initIndex('viewings');

// array contains the data you want to save in the index
// var array = [ { objectID: 1, text: 'Hello' }, { objectID: 2, text: 'World' }  ];
var array = [{
  "objectID": viewingToSave._id,
  "address": viewingToSave.address,
  "lat": viewingToSave.lat,
  "lng": viewingToSave.lng,
  "agentID": viewingToSave.author,
  "agentName": agentName
}];
console.log(array);
index.saveObjects(array, function (error, content) {
  if (error) console.error('Error:', error);
  else console.log('Content:', content);
});
  },
  addEvent(lat, lng, accuracy, timestamp, eventId) {
    check(lat, Number);
    check(lng, Number);
    check(accuracy, Number);
    check(timestamp, Number);
    check(eventId, String);
    console.log(lat);
    var geo = new GeoCoder({
      // geocoderProvider: "mapquest",
      httpAdapter: "https",
      apiKey: Meteor.settings.public.mapsapi
    });
    var result = geo.reverse(lat, lng);
    console.log(result);
    Events.insert({
      viewingId: eventId,
      lat: lat,
      lng: lng,
      accuracy: accuracy,
      timestamp: timestamp,
      statement: 'checked in near'
    }, function(error, response) {
      if (error) {
        console.log(error);
        throw new Meteor.Error('add-event', 'Opps, something went wrong updating your location');
      }
      Events.update(response, {$set: {result}}, {filter: false, validate: false}, function(error,result){
        if (error) {
          throw new Meteor.Error('add-event', 'Opps, something went wrong updating your location');
        }
      });
    });
    // Events.update({result}, {filter: false, validate: false});
  },
  startEventTime(lat, lng, accuracy, timestamp, eventId) {
    console.log("STARTING");
    check(lat, Number);
    check(lng, Number);
    check(accuracy, Number);
    check(timestamp, Number);
    check(eventId, String);
    let geo = new GeoCoder({
      httpAdapter: "https",
      apiKey: Meteor.settings.public.mapsapi
    });
    let result = geo.reverse(lat, lng);
    Events.insert({
      viewingId: eventId,
      lat: lat,
      lng: lng,
      accuracy: accuracy,
      timestamp: timestamp,
      statement: 'started this event near'
    }, function(error, response) {
      if (error) {
        throw new Meteor.Error('add-event', 'Something went wrong starting an event')
      }
      Events.update(response, {$set: {result}}, {filter: false, validate: false}, function(error, result) {
        if (error) {
          throw new Meteor.Error('add-event', 'Something went wrong starting an event');
        }
      });
      let viewing = Viewings.findOne(eventId, {fields: {followersEmail: 1, author: 1}});
      let id = viewing._id;
      let author = viewing.author;
      let emails = viewing.followersEmail;
      emails.forEach(function(emails, index) {
        Meteor.call('sendEmailToFollower', emails, author, id);
        console.log(emails, 'sending email');
        console.log(index);
      });
      console.log(viewing.followersEmail);

    });
  },
  updateStartDateTime(id, dateTime) {
    check(id, String);
    check(dateTime, Date);
    console.log(dateTime);

    Viewings.update(id, {$set: {startTime: dateTime}}, function(error, response) {
      if (error) {
        return error;
      } else {
        return response;
      }
    })
  },
  updateEndDateTime(id, dateTime) {
    check(id, String);
    check(dateTime, Date);
    console.log(dateTime);
    Viewings.update(id, {$set: {endTime: dateTime}}, function(error, response) {
      if (error) {
        return error;
      } else {
        return response;
      }
    })
  },
  getStartTime(id) {
    check(id, String);
    return Viewings.findOne(id, {fields: {startTime: 1}});
  },
  getEndTime(id) {
    check(id, String);
    console.log('get end time', id);
    return Viewings.findOne(id, {fields: {endTime: 1}});
  },
  updateProfileName(user, profileName) {
    check(user, String);
    check(profileName, String);
    Meteor.users.update(user, {$set: {'profile.name': profileName}});
  },
  startTimer(id) {
    check(id, String);
    let user = Meteor.userId();
    console.log(user);
    Viewings.update(id, {$set: {active: true, activeAt: new Date}});
  }
});
