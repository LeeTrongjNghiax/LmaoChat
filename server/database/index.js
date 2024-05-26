const MONGOOSE = require("mongoose");

MONGOOSE.set("strictQuery", true);

const connect = async () => {
  try {
    const CONNECTION = await MONGOOSE.connect(process.env.MONGODB_URL);
    return CONNECTION;
  } catch (error) {
    console.error("Database error: " + error);
    throw new Error();
  }
}

module.exports = connect;