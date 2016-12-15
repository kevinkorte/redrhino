Template.topbar.events({
  'click .js-new-btn'(event) {
    $('.js-new-event-modal').modal({});
  },
  'click .js-sign-out'(event) {
    Meteor.logout();
  },
  'click .resend-verification-link' ( event, template ) {
    Meteor.call( 'sendVerificationLink', ( error, response ) => {
      if ( error ) {
        Bert.alert( error.reason, 'danger' );
      } else {
        let email = Meteor.user().emails[ 0 ].address;
        Bert.alert( `Verification sent to ${ email }!`, 'success' );
      }
    });
  },
  'keyup .js-search'(event) {
    var client = algoliasearch(Meteor.settings.public.algoliaAppId, Meteor.settings.public.algoliaPublicKey);
    var index = client.initIndex('indexName');
    index.search('something', function searchDone(err, content) {
      console.log(err, content);
    });
  }
});
