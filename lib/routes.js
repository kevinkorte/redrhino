if(Meteor.isClient) {
  Accounts.onLogout(function() {
    FlowRouter.go('front-page');
  })
}

var authRoutes = FlowRouter.group({
  name: 'auth',
  triggersEnter: [function(context, redirect) {
    if (!Meteor.userId()) {
      redirect('login');
    }
  }]
});

FlowRouter.route( '/verify-email/:token', {
  name: 'verify-email',
  action( params ) {
    Accounts.verifyEmail( params.token, ( error ) =>{
      if ( error ) {
        Bert.alert( error.reason, 'danger' );
      } else {
        FlowRouter.go( '/' );
        Bert.alert( 'Email verified! Thanks!', 'success' );
      }
    });
  }
});

FlowRouter.route('/', {
  name: 'front-page',
  action() {
    BlazeLayout.render('frontPageLayout', { main: 'signupForm' });
  }
});

authRoutes.route('/home', {
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
