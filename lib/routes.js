if(Meteor.isClient) {
  Accounts.onLogout(function() {
    FlowRouter.go('front-page');
  })
}

FlowRouter.route('/', {
  name: 'front-page',
  action() {
    BlazeLayout.render('frontPageLayout', { main: 'signupForm' });
  }
});

FlowRouter.route('/home', {
  name: 'home',
  action() {
    BlazeLayout.render('dashboardLayout');
  }
});

FlowRouter.route('/account', {
  name: 'account',
  action() {
    BlazeLayout.render('accountLayout');
  }
});
