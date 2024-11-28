import mongoose from "mongoose";
export default mongoose.connect("mongodb://localhost:27017/User").then(() => {
  console.log("databse connected!");
});
