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

FlowRouter.route('/signup', {
  name: 'signup',
  action() {
    BlazeLayout.render('signupLayout');
  }
});

FlowRouter.route('/login', {
  name: 'login',
  action() {
    BlazeLayout.render('loginLayout');
  }
});

FlowRouter.route('/account', {
  name: 'account',
  action() {
    BlazeLayout.render('accountLayout');
  }
});

FlowRouter.route('/:author/:id', {
  name: 'event',
  action() {
    BlazeLayout.render('eventLayout');
  }
});
