var Future = Npm.require('fibers/future');

Meteor.methods({
  createTrialCustomer: function(customer){
    check(customer, {
      name: String,
      emailAddress: String,
      password: String,
      plan: String,
    });
    //we check if the email address already exists in our records
    //and if so, we do not sign them up again
    var emailRegex     = new RegExp(customer.emailAddress, "i");
    var lookupCustomer = Meteor.users.findOne({"emails.address": emailRegex});

    if ( !lookupCustomer ) {
      let newCustomer = new Future();

      Meteor.call('stripeCreateCustomer', customer.emailAddress, function(error, stripeCustomer){
        if( error ) {
          //better error handling here?
          console.log(error);
        } else {
          let customerId = stripeCustomer.id,
              plan       = customer.plan;

          Meteor.call('stripeCreateSubscription', customerId, plan, function(error, response){
            if( error ) {
              //better error handling here?
              console.log(error);
            } else {
              try {
                var user = Accounts.createUser({
                  email: customer.emailAddress,
                  password: customer.password,
                  name: customer.name,
                });
                var subscription = {
                  customerId: customerId,
                  subscription: {
                    plan: {
                      name: customer.plan
                    },
                  }
                };//end subscription var
                Meteor.users.update(user, {
                  $set: subscription
                }, function(error, response){
                  if ( error ) {
                    console.log(error);
                  } else {
                    newCustomer.return(user);
                  }
                });//end Meteor.users.update
              } catch( exception ) {
                newCustomer.return(exception);
              }//end catch
            }//end if statement
          });//end stripe create subscription call
          return newCustomer.wait();
        }//ends if
      });//ends stripecreatecustomer
    } else { //customer lookup came back true
      throw new Meteor.Error('customer-exists', 'Sorry, that customer email already exists!');
    }
  },//ends create trial customer method
  stripeCreateCustomer: function(email){
    check(email, String);
    let stripeCustomer = new Future();
    let secret = Meteor.settings.private.stripe.testSecretKey;
    let Stripe = StripeAPI(secret);

    Stripe.customers.create({
      email: email
    }, function(error, customer){
      if ( error ){
        stripeCustomer.return(error);
      } else {
        stripeCustomer.return(customer);
      }
    });

    return stripeCustomer.wait();
  },//end stripeCreateCustomer
  stripeCreateSubscription: function(customer, plan){
    check(customer, String);
    check(plan, String);

    var stripeSubscription = new Future();
    let secret = Meteor.settings.private.stripe.testSecretKey;
    let Stripe = StripeAPI(secret);

    Stripe.customers.createSubscription(customer, {
      plan: plan
    }, function(error, subscription) {
      if ( error ) {
        stripeSubscription.return(error);
      } else {
        stripeSubscription.return(subscription);
      }
    });
    return stripeSubscription.wait();
  }
});//end meteor methods
