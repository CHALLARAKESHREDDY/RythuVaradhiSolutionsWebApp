const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const twilio = require("twilio");
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');


const app = express();
const PORT = 402;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const dbURL = 'mongodb+srv://StrikeOut:Rak1237@cluster0.oz1b53i.mongodb.net/rythu_vaaradhi';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};




// Define Mongoose Schema
const farmerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: String,
  crops: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crop',
  }],
  cattlePosts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CattlePost',
  }],
});
// Create Mongoose Model
const cropSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer',
    required: true,
  },
});


const CattlePostSchema = new mongoose.Schema({
  data1: {
    type: Buffer,
    required: true,
  },
  data2:{
    type:Buffer,
    require:false,
  },
  data3:{
    type:Buffer,
    required:false
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: true,
  },
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer',
    required: true,
  },
});

const Farmer = mongoose.model('Farmer', farmerSchema);
const Crop = mongoose.model('Crop', cropSchema);
const CattlePost = mongoose.model('CattlePost', CattlePostSchema);





// Start the server
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// Connect to MongoDB and start the server
const initializeApp = async () => {
  await connectToDatabase();
  startServer();
};

initializeApp();

// Register a farmer
app.post("/register", async (req, res) => {
  const { fullName, phoneNumber, email } = req.body;
  try {
    const farmer = await Farmer.create({ fullName, phoneNumber, email });
    console.log(farmer._id.toString());
    res.status(201).json({ message: 'Farmer registered successfully', farmer });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add crops for a specific farmer
app.post("/mycrops", async (req, res) => {
  const { crops, farmerId } = req.body;
  try {
    const farmer = await Farmer.findById(farmerId);
    if (!farmer) {
      return res.status(404).json({ error: 'Farmer not found' });
    }

    const cropPromises = crops.map(async (cropName) => {
      const newCrop = await Crop.create({ name: cropName, farmer: farmer._id });
      farmer.crops.push(newCrop);
    });

    await Promise.all(cropPromises);
    await farmer.save();

    res.status(201).json({ message: 'Crops added successfully', crops });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Twilio Verification Endpoint
// Twilio Verification Endpoint

const storage = multer.memoryStorage(); // Store file data in memory
const upload = multer({ storage: storage });

// Routes

// Upload image
// Upload image
app.post("/upload", upload.fields([{ name: 'data1', maxCount: 1 }, { name: 'data2', maxCount: 1 }, { name: 'data3', maxCount: 1 }]), async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length !== 3) {
      return res.status(400).json({ error: 'Exactly three files are required' });
    }

    const { farmerId, category, price, location, description } = req.body;

    const farmer = await Farmer.findById(farmerId);
    const cattlePost = await CattlePost.create({
      data1: req.files['data1'][0].buffer,
      data2: req.files['data2'][0].buffer,
      data3: req.files['data3'][0].buffer,
      category: category,
      price: price,
      location: location,
      description: description,
      farmer: farmer._id,
    });

    farmer.cattlePosts.push(cattlePost);
    await farmer.save();

    res.status(201).json({ message: 'Cattle post uploaded successfully', cattlePost });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// Update the /images route to fetch images with associated farmer details
// Update the /images route to fetch images with associated farmer details
// Update the /images route to fetch images with associated farmer details
/*app.get("/images", async (req, res) => {
  try {
    // Retrieve all images from MongoDB with associated farmer details
    const images = await CattlePost.find().populate({
      path: 'farmer',
      select: 'fullName phoneNumber category price location description',
    });

    // Map the images to send relevant information to the frontend
    const imageList = images.map(image => ({
      _id: image._id,
      farmerName: image.farmer.fullName,
      farmerPhoneNumber: image.farmer.phoneNumber,
      category: image.category,
      price: image.price,
      location: image.location,
      description: image.description,
      // Add other relevant fields if needed
    }));

    res.status(200).json(imageList);
console.log(imageList)
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});*/

app.get("/images", async (req, res) => {
  try {
    // Retrieve all images from MongoDB with associated farmer details
    const images = await CattlePost.find().populate({
      path: 'farmer',
      select: 'fullName phoneNumber category price location description',
    });

    // Map the images to send relevant information to the frontend
    const imageList = images.map(image => ({
      _id: image._id,
      farmerName: image.farmer.fullName,
      farmerPhoneNumber: image.farmer.phoneNumber,
      category: image.category,
      price: image.price,
      location: image.location,
      description: image.description,
      data1: image.data1.toString('base64'), // Convert Buffer to base64 for sending in response
      data2: image.data2.toString('base64'),
      data3: image.data3.toString('base64'),
      // Add other relevant fields if needed
    }));

    res.status(200).json(imageList);
    console.log(imageList);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





// ...

// Add a new route to serve individual images
app.get("/image/:id", async (req, res) => {
  try {
    const cattlePost = await CattlePost.findById(req.params.id);

    if (!cattlePost) {
      return res.status(404).json({ error: 'Cattle post not found' });
    }

    const images = [cattlePost.data1, cattlePost.data2, cattlePost.data3];

    // Extract the image index from the request (assuming you send the index as a query parameter)
    const imageIndex = req.query.index || 0;

    if (imageIndex < 0 || imageIndex >= images.length) {
      return res.status(404).json({ error: 'Image index out of bounds' });
    }

    // Set the appropriate content type for the response
    res.setHeader('Content-Type', 'image/jpeg'); // Adjust content type based on your image type

    // Send the specified image data as the response
    res.send(images[imageIndex]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/cattle_item/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Use mongoose to find the document by ID
    const product = await CattlePost.findById(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Send the product details as the response
    const result = {
    
      category: product.category,
      price: product.price,
      location: product.location,
      description: product.description,
      // Add other relevant fields if needed
    };
    console.log(result)
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Backend endpoint to get images for a cattle post
app.get("/Cattle_Images/:id", async (req, res) => {
  try {
    const cattlePost = await CattlePost.findById(req.params.id).populate({
      path: 'farmer',
      select: 'fullName phoneNumber category price location description',
    });;

    if (!cattlePost) {
      return res.status(404).json({ error: 'Cattle post not found' });
    }



    res.json({ ...cattlePost.toObject()});
    console.log(cattlePost)

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



/* app.get("/images/:id", async (req, res) => {
  try {
    const cattlePost = await CattlePost.findById(req.params.id);

    if (!cattlePost) {
      return res.status(404).json({ error: 'Cattle post not found' });
    }

    const images = [cattlePost.data1, cattlePost.data2, cattlePost.data3];

    // Set the appropriate content type for the response
    res.setHeader('Content-Type', 'image/jpeg'); // Adjust content type based on your image type

    // Send all three images data as the response
    res.send(images);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}); */


app.get("/images/:id", async (req, res) => {
  try {
    const cattlePost = await CattlePost.findById(req.params.id);

    if (!cattlePost) {
      return res.status(404).json({ error: 'Cattle post not found' });
    }

    const images = [cattlePost.data1, cattlePost.data2, cattlePost.data3];

    // Extract the image index from the request (assuming you send the index as a query parameter)
    const imageIndex = req.query.index || 0; // Default to 'unknown' if color is not provided

    if (imageIndex < 0 || imageIndex >= images.length) {
      return res.status(404).json({ error: 'Image index out of bounds' });
    }

    // Set the appropriate content type for the response
    res.setHeader('Content-Type', 'image/jpeg'); // Adjust content type based on your image type

    // Send the specified image data as the response
    res.send(images[imageIndex]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});









