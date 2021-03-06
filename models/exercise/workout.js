const mongoose = require(`mongoose`);

const resistanceSchema = new mongoose.Schema({
  name: { type: String, required: true, min: 1, max: 10000, trim: true },
  sets: { type: Number, required: true, min: 1, max: 10000, trim: true },
  reps: {
    type: [
      {
        type: Number,
        min: 1
      }
    ],
    required: true,
    min: 1,
    max: 10000,
    trim: true
  },
  weight: {
    type: [
      {
        type: Number,
        min: 1
      }
    ],
    required: true,
    min: 1,
    max: 10000,
    trim: true
  }
});

const cardioSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  distance: {
    type: Number,
    required: function() {
      return !this.time; //only required if there is no time
    },
    min: 0,
    max: 10000,
    trim: true
  },
  time: {
    type: Number,
    required: function() {
      return !this.distance; //only required if there is no distance
    },
    min: 0,
    max: 10000,
    trim: true
  }
});

const workOutSchema = new mongoose.Schema({
  date: { type: String },
  week: { type: Number },
  month: { type: Number },
  user: { type: String },
  name: {
    type: String,
    max: 250,
    trim: true
  },
  //Nested resistance schema, requried if no cardio data
  resistance: {
    type: [resistanceSchema],
    required: function() {
      return !this.cardio;
    }
  },
  //Nested cardio schema, requried if no resistance data
  cardio: {
    type: [cardioSchema],
    required: function() {
      return !this.resistance;
    }
  }
});

const WorkOut = mongoose.model("WorkOut", workOutSchema);

module.exports = WorkOut;
