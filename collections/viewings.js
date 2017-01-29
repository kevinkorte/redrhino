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
    type: Date,
    optional: true
  },
  endTime: {
    type: Date,
    optional: true
  },
  author: {
    type: String,
    autoValue: function() {
      return this.userId
    }
  },
  active: {
    type: Boolean,
    defaultValue: false
  },
  activeAt: {
    type: Date,
    optional: true
  },
  "followersEmail": {
    type: [String],
    optional: true
  }
})

Viewings.attachSchema( ViewingSchema );
