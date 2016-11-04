Template.card.events({
  'submit .js-add-card': function(event) {
    event.preventDefault();
    var currentUser      = Meteor.userId();
    var updateCardButton = $(".update-card").button('loading');
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
            updateCardButton.button('reset');
          } else {
            console.log(response);
            if (response.rawType !== undefined && response.rawType == "card_error"){
              Bert.alert(response.message, "danger");
              updateCardButton.button('reset');
            } else {
              updateCardButton.button('reset');
              Session.set('currentUserPlan_' + currentUser, null);
              Session.set('addingNewCreditCard', false);
              Bert.alert("New card successfully added!", "success");
            }
          }
        });
    });
  }
});
