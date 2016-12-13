Template.card.events({
  'submit .js-add-card': function(event) {
    event.preventDefault();
    $('.js-submit-card').addClass('loading');
    var currentUser      = Meteor.userId();
    STRIPE.getToken( '.js-add-card', {
        number: $('[data-stripe="cardNumber"]').val(),
        exp_month: $('[data-stripe="expMo"]').val(),
        exp_year: $('[data-stripe="expYr"]').val(),
        cvc: $('[data-stripe="cvc"]').val()
      }, function() {
        var token = $( ".js-add-card [name='stripeToken']" ).val();
        Meteor.call('stripeSwapCard', token, function(error, response){
          if (error){
            Bert.alert(error.reason.message, 'danger');
            $('.js-submit-card').removeClass('loading');
            $('.js-add-card')[0].reset();
          } else {
            console.log(response);
            if (response.rawType !== undefined && response.rawType == "card_error"){
              Bert.alert(response.message, "danger");
              $('.js-submit-card').removeClass('loading');
              $('.js-add-card')[0].reset();
            } else {
              Session.set('currentUserPlan_' + currentUser, null);
              Session.set('addingNewCreditCard', false);
              Bert.alert("New card successfully added!", "success");
              $('.js-submit-card').removeClass('loading');
              $('.js-add-card')[0].reset();
            }
          }
        });
    });
  }
});

Template.card.helpers({
  user: function() {
    if (Meteor.user()) {
      return Meteor.user();
    }
  },
  // cardIcon: function(cardType) {
  //   switch (cardType) {
  //     case "discover":
  //       '<img src="/discover.png" />'
  //       break;
  //   }
  // }
});
