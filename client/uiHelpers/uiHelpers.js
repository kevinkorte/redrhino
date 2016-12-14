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
})
