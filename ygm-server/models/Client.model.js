// import mongoose from 'mongoose';

// const clientSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   description: String,
//   logo: String,
//   website: {
//     type: String,
//     default: "#",
//   },
//   serviceType: {
//     type: String,
//   },
//   duration: String,
//   serviceID: {
//     type: mongoose.Schema.Types.ObjectId, // MongoDB default _id from Service
//     ref: "Service",                       // Reference to Service collection
//   }
// }, { timestamps: true });

// export default mongoose.model("Client", clientSchema);



import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    logo: String,
    website: {
      type: String,
      default: "#",
    },
    serviceType: {
      type: String,
    },
    duration: String,

    serviceID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service", // Reference to Service collection
    },

    // 👇 New field for ordering clients
    order: {
      type: Number,
      required: true,
      default: 9999, // keep large number so new clients go to end
    },
  },
  { timestamps: true }
);

export default mongoose.model("Client", clientSchema);
