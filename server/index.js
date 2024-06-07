const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(
  cors({
    origin: ["https://job-filters-react.netlify.app"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.db_config, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Define Job model
const jobSchema = new mongoose.Schema({
  title: String,
  type: String,
  description: String,
  location: String,
  salary: String,
  company: {
    name: String,
    description: String,
    contactEmail: String,
    contactPhone: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Job = mongoose.model("Job", jobSchema);

// Routes
app.get("/api/jobs", async (req, res) => {
  try {
    let jobs;
    if (req.query._limit) {
      const limit = parseInt(req.query._limit);
      jobs = await Job.find().sort({ createdAt: -1 }).limit(limit); // Sort by createdAt field in descending order
    } else {
      jobs = await Job.find().sort({ createdAt: -1 }); // Sort by createdAt field in descending order
    }
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/jobs", async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    console.error("Error adding job:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Update an existing job
app.put("/api/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findByIdAndUpdate(id, req.body, { new: true });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Get a job by ID
app.get("/api/jobs/:id", async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete a job by ID
app.delete("/api/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findByIdAndDelete(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
