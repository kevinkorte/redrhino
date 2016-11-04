var Future = Npm.require('fibers/future');
var Fiber = Npm.require('fibers');
var secret = Meteor.settings.private.stripe.testSecretKey;
var Stripe = StripeAPI(secret);

Meteor.methods({
  stripeSwapCard: function(token){
  check(token, String);

  var stripeSwapCard = new Future();

  var user    = Meteor.userId();
  var getUser = Meteor.users.findOne({"_id": user}, {fields: {"customerId": 1}});
  Stripe.customers.update(getUser.customerId, {
    source: token
  }, function(error, customer){
    if (error) {
      stripeSwapCard.return(error);
    } else {
      var card = {
        lastFour: customer.sources.data[0].last4,
        type: customer.sources.data[0].brand
      }
      Fiber(function(){
        var update = {
          auth: SERVER_AUTH_TOKEN,
          user: user,
          card: card
        }
        console.log(update);

        /*

        TODO:
        NEED TO ADD THE CALL BELOW

        */
        Meteor.call('updateUserCard', update, function(error, response){
          if (error){
            stripeSwapCard.return(error);
          } else {
            stripeSwapCard.return(response);
          }
        });
      }).run();
    }
  });
  return stripeSwapCard.wait();
  },
  updateUserCard: function(update){
    // Check our update argument against our expected pattern.
    check(update, {auth: String, user: String, card: {lastFour: String, type: String}});

    // Here, we need to create a new Future because we'll be returning this information back to
    // our Stripe method. Note, we're mostly doing this because we're "blocking" the return of our
    // update method below in order to check the security of our method call. Certainly a trade-off,
    // but considering it nets us an extra touch of security, not that bad.
    var updateUserCard = new Future();

    // Before we perform the update, ensure that the auth token passed is valid.
    if ( update.auth == SERVER_AUTH_TOKEN ){
      // If arguments are valid, continue with updating the user.
      Meteor.users.update(update.user, {
        $set: {
          "subscription.payment.card": update.card
        }
      }, function(error, response){
        if (error) {
          updateUserCard.return(error);
        } else {
          updateUserCard.return(response);
        }
      });
    } else {
      throw new Meteor.Error('invalid-auth-token', 'Sorry, your server authentication token is invalid.');
    }

    return updateUserCard.wait();
  }
});
