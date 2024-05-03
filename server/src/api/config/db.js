import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect(
      "mongodb://admin:mongo123@ac-e85t195-shard-00-00.rzm9aia.mongodb.net:27017,ac-e85t195-shard-00-01.rzm9aia.mongodb.net:27017,ac-e85t195-shard-00-02.rzm9aia.mongodb.net:27017/?ssl=true&replicaSet=atlas-twp6sm-shard-0&authSource=admin&retryWrites=true&w=majority"
    );
  } catch (err) {
    console.log("Error connecting to DB");
  }
};

export default connectDB;
