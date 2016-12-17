Template.loginForm.events({
  'submit .js-login-form'(event) {
    event.preventDefault();
    const loginEmail = event.target.loginEmail.value;
    const loginPassword = event.target.loginPassword.value;
    Meteor.loginWithPassword(loginEmail, loginPassword, function(error) {
      if (error) {
        alert(error.reason);
      } else {
        FlowRouter.go('home');
      }
    })
  },
  'click .password-btn.pw-unhide'(event) {
    event.preventDefault();
    $('#password').prop('type', 'text');
    $('.password-btn').removeClass('pw-unhide').addClass('pw-hide').children().removeClass('unhide').addClass('hide');
  },
  'click .password-btn.pw-hide'(event) {
    event.preventDefault();
    $('#password').prop('type', 'password');
    $('.password-btn').removeClass('pw-hide').addClass('pw-unhide').children().removeClass('hide').addClass('unhide');
  },
  'submit .sendPasswordReset'(event) {
    event.preventDefault();
    const email = event.target.loginEmail.value;
    Accounts.forgotPassword({email:email}, function(error) {
      if (error) {
        Bert.alert( error.reason, 'danger', 'growl-top-right' );
      } else {
        Bert.alert( 'Sweet, check your email', 'success', 'growl-top-right', 'fa-check' );
      }
    })
  }
})
