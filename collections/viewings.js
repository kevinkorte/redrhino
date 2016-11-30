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
  },
  author: {
    type: String,
    autoValue: function() {
      return this.userId
    }
  },
  "followers.$.email": {
    type: String
  }
})

Viewings.attachSchema( ViewingSchema );
