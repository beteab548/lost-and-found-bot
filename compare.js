import Clarifai from "clarifai";

// Initialize the Clarifai app with your API key (Personal Access Token)
const app = new Clarifai.App({
  apiKey: "sadasd", // Replace with your actual API key from Clarifai
});

// Example image URL to test
const imageUrl = "https://samples.clarifai.com/metro-north.jpg";

// Predict labels or concepts in an image
app.models
  .predict(Clarifai.GENERAL_MODEL, imageUrl) // GENERAL_MODEL is for general image recognition
  .then((response) => {
    console.log("Predicted concepts:", response.outputs[0].data.concepts);
  })
  .catch((err) => {
    console.error("Error:", err);
  });
