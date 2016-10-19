var Future = Npm.require('fibers/future');

Meteor.methods({
  createTrialCustomer: function(customer){
    check(customer, {
      name: String,
      emailAddress: String,
      password: String,
      plan: String,
    });
    // we check if the email address already exists in our records
    // and if so, we do not sign them up again
    var emailRegex     = new RegExp(customer.emailAddress, "i");
    var lookupCustomer = Meteor.users.findOne({"emails.address": emailRegex});

    if ( !lookupCustomer ) {
      let newCustomer = new Future();

      Meteor.call('stripeCreateCustomer', customer.emailAddress, function(error, stripeCustomer){
        if( error ) {
          // better error handling here?
          console.log(error);
        } else {
          let customerId = stripeCustomer.id,
              plan       = customer.plan;

          Meteor.call('stripeCreateSubscription', customerId, plan, function(error, response){
            if( error ) {
              // better error handling here?
              console.log(error);
            } else {
              try {
                var user = Accounts.createUser({
                  email: customer.emailAddress,
                  password: customer.password,
                  profile: {
                    name: customer.name,
                  }
                });

                var subscription = {
                  customerId: customerId,
                  subscription: {
                    plan: {
                      name_id: customer.plan,
                      name_retail: response.plan.name,
                      cost: response.plan.amount,
                      currency: response.plan.currency,
                      interval: response.plan.interval
                    },
                    subscription_id: response.id,
                    delinquent: stripeCustomer.delinquent,
                    created: response.created,
                    current_period_end: response.current_period_end,
                    current_period_start: response.current_period_start,
                    status: response.status,
                    trial_end: response.trial_end,
                    trial_start: response.trial_start
                  }
                }
                console.log(user);
                Meteor.call('sendVerificationLink', user);
                // Perform an update on our new user.
                Meteor.users.update(user, {
                  $set: subscription
                }, function(error, response){
                  if (error){
                    console.log(error);
                  } else {
                    // Once the subscription data has been added, return to our Future.
                    newCustomer.return(user);
                  }
                });
              } catch(exception) {
                newCustomer.return(exception);
              }
            }
          });
        }
      });
      // Return our newCustomer Future.
      return newCustomer.wait();
    } else {
      throw new Meteor.Error('customer-exists', 'Sorry, that customer email already exists!');
    }
  },
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
  }, // end stripeCreateCustomer
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
});// end meteor methods
