import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
});

Meteor.startup(function() {
  GoogleMaps.load({
    key: Meteor.settings.public.mapsapi,
    libraries: 'places'  // also accepts an array if you need more than one
  });
});
