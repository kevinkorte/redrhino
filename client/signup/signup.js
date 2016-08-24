Template.signupForm.rendered = function(){
  $('#application-signup').validate({
    rules: {
      name: {
        required: true,
      },
      emailAddress: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        minlength: 6,
      },
    },
    messages: {
      name: {
        required: 'Please enter your name.',
      },
      emailAddress: {
        required: 'Please enter your email address to sign up.',
        email: 'Please enter a valid email address.',
      },
      password: {
        required: 'Please enter a password to sign up.',
        minlength: 'Please use at least six characters.',
      },
    },
    submitHandler: function(){
      // create our customer object from the field
      const customer = {
        name: $('[name="name"]').val(),
        emailAddress: $('[name="emailAddress"]').val(),
        password: $('[name="password"]').val(),
        plan: 'basic-monthly-1'
      }
      // Bootstrap specific to show button loading text
      const submitButton = $('input[type="submit"]').button('loading')

      Meteor.call('createTrialCustomer', customer, function(error, response){
        if (error) {
           // if our meteor app errors
           alert(error);
           // reset bootstrap button above
          submitButton.button('reset')
        } else {
          if (response.error) {
             // this error is if stripe returns an error trying to create a customer
             alert(response.message);
            submitButton.button('reset')
          } else {
             console.log('login');
            Meteor.loginWithPassword(customer.emailAddress, customer.password, function(error){
              if (error) {
                 alert(error.reason);
                submitButton.button('reset')
              } else {
                FlowRouter.go('/home')
                submitButton.button('reset')
              } // ends if statement
            })// ends Meteor.loginWithPassword
          }// ends if response.error statement
        }// ends if error statement
      })// end meteor call 'createTrialCustomer'
    }, // ends submitHandler callback
  })
}
