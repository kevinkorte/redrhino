Meteor.methods({
  sendVerificationLink(userId) {
    if (userId) {
      console.log('send no lookup');
      return Accounts.sendVerificationEmail( userId );
    } else {
      console.log('send lookup');
      let userId = Meteor.userId();
      return Accounts.sendVerificationEmail( userId );
    }
  },
  findUserById(id) {
    check(id, String);
    if (id) {
      let event = Viewings.findOne(id);
      let userId = event.author;
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
    let emailAlreadyExist = Meteor.users.find({"emails.address": followerEmail}, {limit: 1}).count()>0;
    if (!emailAlreadyExist) {
      Viewings.update(id, {$addToSet: {followersEmail: followerEmail}});
    }
    console.log(emailAlreadyExist);
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
  },
  // ToDo: Format sending Email better
  sendEmailToFollower(followerEmail, authorId, id) {
    check(followerEmail, String);
    check(authorId, String);
    check(id, String);
    let agent = Meteor.users.findOne(authorId);
    SSR.compileTemplate('htmlEmail', Assets.getText('html-email.html'));

    var emailData = {
      followerEmail: followerEmail,
      agent: agent.profile.name,
      agentId: authorId,
      id: id,
    };

    Email.send({
      to: "kevinkorte15@gmail.com",
      from: "from.address@email.com",
      subject: "Example Email",
      html: SSR.render('htmlEmail', emailData),
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
    }, function(error, response) {
      if (error) {
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
  }
});
