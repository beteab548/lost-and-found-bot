import express from "express";
const app = express();
app.use("/", (req, res) => {
  res.json({ message: "you are on the backend" });
});
app.listen(3000, () => {
  console.log("app listning on port 3000");
});
