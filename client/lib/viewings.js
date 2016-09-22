Viewings = new Mongo.Collection("viewings");

Schemas = {}

Schemas.Viewings = new SimpleSchema({
  address: {
    type: String
  }
})

Viewings.attachSchema(Schemas.Viewings);
