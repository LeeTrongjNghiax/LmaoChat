const MONGOOSE = require("mongoose");

const USER = MONGOOSE.model(
  "User",
  new MONGOOSE.Schema({
    id: {
      type: MONGOOSE.ObjectId
    },
    name: {
      type: String,
      require: true
    },
    phoneNumber: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
    },
    avatarUrl: {
      type: String,
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