Template.registerHelper( 'agent', ( agentId ) => {
  if (agentId) {
    Meteor.call('findUserById', agentId, function(error,response){
      if(error) {
        console.log(error.reason)
      } else {
        Session.set("agent", response);
      }
    });
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

Template.registerHelper('agentName', (agent) => {
  let agentProfile = Meteor.users.findOne(agent);
  return agentProfile.profile.name;
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
