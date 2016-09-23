Viewings = new Mongo.Collection("viewings");

ViewingSchema = new SimpleSchema({
  address: {
      type: String,
      label: "Address",
  },
  lat: {
    type: String,
  },
  lng: {
    type: String,
  }
})

Viewings.attachSchema( ViewingSchema );
