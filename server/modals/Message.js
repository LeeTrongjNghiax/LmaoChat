const MONGOOSE = require("mongoose");

const MESSAGE = MONGOOSE.model(
  "Message",
  new MONGOOSE.Schema(
    {
      id: {
        type: MONGOOSE.ObjectId
      },
      roomId: {
        type: String,
        require: true
      },
      userSend: {
        type: String, 
        require: true
      }, 
      content: {
        type: String,
        require: true
      },
      dateCreate: {
        type: String,
        require: true
      },
      status: {
        type: String, 
        require: true, 
        default: "ACTIVE", 
      }, 
      reacts: [
        {
          phoneNumber: {
            type: String,
            require: true
          },
          emoji: {
            type: String,
            require: true
          }, 
          dateCreate: {
            type: String, 
            require: true
          }
        }
      ],
    }, 
    {
      timestamps: true
    }
  )
);

module.exports = MESSAGE;