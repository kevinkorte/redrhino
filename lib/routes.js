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
  triggersEnter: [function(context, redirect) {
    $('body').addClass('dashboard-page');
  }],
  triggersExit: [function(context, redirect) {
    $('body').removeClass('dashboard-page');
  }],
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
  triggersEnter: function() {
    $('body').addClass('login');
  },
  triggersExit: function() {
    $('body').removeClass('login');
  },
  action() {
    BlazeLayout.render('loginLayout');
  }
});

authRoutes.route('/account', {
  name: 'account',
  action() {
    BlazeLayout.render('accountLayout', {main: 'accountsProfile' });
  }
});

authRoutes.route('/account/card', {
  name: 'card',
  action() {
    BlazeLayout.render('accountLayout', { main: 'card' });
  }
});

authRoutes.route('/account/subscription', {
  name: 'subscription',
  action() {
    BlazeLayout.render('accountLayout', {main: 'subscription'});
  }
})

FlowRouter.route('/:author/:id', {
  name: 'event',
  action() {
    BlazeLayout.render('eventLayout');
  }
});
