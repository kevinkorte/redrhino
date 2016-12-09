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
  startTime: {
    type: Date
  },
  endTime: {
    type: Date
  },
  author: {
    type: String,
    autoValue: function() {
      return this.userId
    }
  },
  "followersEmail": {
    type: [String]
  }
})

Viewings.attachSchema( ViewingSchema );
