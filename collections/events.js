Events = new Mongo.Collection("events");

EventsSchema = new SimpleSchema({
  viewingId: {
    type: String,
  },
  lat: {
    type: String,
  },
  lng: {
    type: String,
  },
  accuracy: {
    type: Number,
  },
  timestamp: {
    type: Number,
  }
});

Events.attachSchema( EventsSchema );
