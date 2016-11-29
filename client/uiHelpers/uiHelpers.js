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
