Template.registerHelper( 'agent', ( agentId ) => {
  if (agentId) {
    // Meteor.call('findUserById', agentId, function(error,response){
    //   if(error) {
    //     console.log(error.reason)
    //   } else {
    //     return response;
    //   }
    // });

    let agent = Meteor.users.findOne(agentId);
    return agent.profile.name;
  }
});

Template.registerHelper( 'unixToTimeAgo', (timestamp) => {
  if (timestamp) {
    return moment(timestamp).calendar();
  }
});
Template.registerHelper('joinDate', (date) => {
  if (date) {
    return moment(date).format("MMM D, YYYY");
  }
});

Template.registerHelper('cardIcon', (cardType) => {
  switch (cardType) {
    case "Discover":
      return "<img src='/discover.png' />";
      break;
    case "Visa":
      return "<img src='/visa.png' />";
      break;
    case "Mastercard":
      return "<img src='/mastercard.png' />"
      break;
    case "American Express":
      return "<img src='/amex.png' />"
      break;
    case "Diners Club":
      return "<img src='/diners.png' />"
      break;
    case "JCB":
      return "<img src='/jcb.png' />"
      break;
    default:
      return "<img src='/credit.png' />"
  }
});

Template.registerHelper('unixToTimeLeft', (unixTimestamp) => {
  if (unixTimestamp) {
    return moment.unix(unixTimestamp).fromNow();
  }
});

Template.registerHelper('timeToStart', (timestamp) => {
  if (timestamp) {
    return moment(timestamp).fromNow();
  }
});

Template.registerHelper('getAgentName', () => {
  let agent = Session.get('agent');
  console.log(agent);
  console.log(agent.profile.name);
  return agent.profile.name;
  if (agent) {
    return agent.profile.name;
  }
});

Template.registerHelper('getStartTime', (startTime) => {
  if (startTime) {
    return moment(startTime).format("dddd, M/D - h:mm A");
  } else {
    return "No start time set."
  }
});
Template.registerHelper('getEndTime', (endTime) => {
  if (endTime) {
    return moment(endTime).format("dddd, M/D - h:mm A");
  } else {
    return "No end time set."
  }
});
Template.registerHelper('relativeTime', (startTime, endTime) => {
  Session.get('time');
  if (startTime) {
    if (moment(endTime).isBefore(moment())) {
      return "Ended "+moment(endTime).fromNow();
    } else if (moment(startTime).isBefore(moment())) {
      return "Ends "+moment(endTime).fromNow();
    } else if (moment(startTime).isAfter(moment())) {
      return "Starts "+moment(startTime).fromNow();
    } else {
      return;
    }
  }
});
Template.registerHelper('isMe', (agent) => {
  if (agent) {
    if (agent == Meteor.userId()) {
      let agentProfile = Meteor.users.findOne(agent);
      return '<div class="ui red horizontal label">'+agentProfile.profile.name+'</div>'
    }
  }
});

Template.registerHelper('eventMonth', (time) => {
  if (time) {
    console.log(time);
    return moment(time).format('MMMM');
  }
});

Template.registerHelper('eventDay', (time) => {
  if (time) {
    console.log(time);
    return moment(time).format('D');
  }
});

Template.registerHelper('eventTime', (time) => {
  if (time) {
    console.log(time);
    return moment(time).format('h:mm A');
  }
});

Template.registerHelper('countdownUntilEnd', (activeAt, endTime) => {
  console.log(activeAt);
  console.log(endTime);
  return 'Ends ' + moment(Session.get('time')).to(endTime);
  // let interval = Meteor.setInterval(function() {
  //   console.log('set interval');
  // }, 5000);
  // console.log(interval);
})
