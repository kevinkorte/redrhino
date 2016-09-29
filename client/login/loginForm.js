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
  }
})
