/*
* Allow
*/

Meteor.users.allow({
  insert: function(){
    return true;
  },
  update: function(userId, doc){
    return true;
  },
  remove: function(){
    return true;
  }
});


/*
* Deny
*/

// Meteor.users.deny({
//   insert: function(){
//     return true;
//   },
//   update: function(){
//     return true;
//   },
//   remove: function(){
//     return true;
//   }
// });
