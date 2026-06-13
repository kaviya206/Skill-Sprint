require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Skill = require("./models/Skill");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/skills", async (req, res) => {
  const skills = await Skill.find();
  res.json(skills);
});

app.get("/", (req, res) => {
  res.send("SkillSprint Backend Running Successfully");
});

app.post("/skills", async (req, res) => {
  const skill = await Skill.create(req.body);
  res.json(skill);
});

app.delete("/skills/:id", async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(process.env.PORT, () => {
  console.log("Server Running");
});