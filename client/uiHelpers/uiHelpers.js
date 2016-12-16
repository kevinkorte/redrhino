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

Template.registerHelper('upcomingLabelColor', (timestamp) => {
  if (timestamp) {
    if (moment(timestamp).diff(moment(), 'hours') >= 24) {
      return "green";
    } else if (moment(timestamp).diff(moment(), 'hours') < 24) {
      return "yellow";
    }
    // return moment(timestamp).diff(moment(), 'hours') >= 24;
  }
});

Template.registerHelper('agentName', (agent) => {
  let agentProfile = Meteor.users.findOne(agent);
  return agentProfile.profile.name;
});

Template.registerHelper('getStartTime', (startTime) => {
  console.log(startTime);
  return moment(startTime).format("dddd, M/MM - h:mm A");
})
