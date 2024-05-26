const MONGOOSE = require("mongoose");

const USER = MONGOOSE.model(
  "User",
  new MONGOOSE.Schema({
    id: {
      type: MONGOOSE.ObjectId
    },
    firstName: {
      type: String,
      require: true
    },
    lastName: {
      type: String,
      require: true
    },
    phoneNumber: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: false
    },
    password: {
      type: String,
      require: true
    },
    avatarUrl: {
      type: String,
      require: false
    },
    friends: [
      {
        phoneNumber: {
          type: String,
          require: true
        },
        relationshipId: {
          type: String,
          require: true
        }
      }
    ],
    requestSends: {
      type: [String],
    },
    requestGets: {
      type: [String],
    },
  })
);

module.exports = USER;