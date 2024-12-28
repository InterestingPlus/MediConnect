const Appointment = require("../models/appointment.model.js");
const Doctor = require("../models/doctor.model.js");
const Review = require("../models/review.model.js");

module.exports.addReview = async (req, res) => {
  const { doctorId, patientId, rating, title, review } = req.body;

  try {
    await Review.create({ doctorId, patientId, rating, title, review });

    return res.status(200).json({
      message: "Review Added SuccessFully!",
      status: true,
    });
  } catch (err) {
    console.log("Error While Adding Review!");
    return res.status(500).json({
      message: "Can't add Review!",
      status: false,
    });
  }
};

module.exports.checkReview = async (req, res) => {
  try {
    const { userId } = req.body;

    let final_result = false;
    let message;

    const appointment_data = await Appointment.findOne({
      patientId: userId,
      status: "visited",
    });

    if (appointment_data) {
      const review_data = await Review.findOne({
        doctorId: appointment_data.doctorId,
        patientId: appointment_data.patientId,
      });

      message = "Visited Appointments Fetched";

      if (review_data) {
        message = "Reviews Fetched!";
        final_result = false;
        console.log(review_data);
      } else {
        const doctor_data = await Doctor.findOne({
          _id: appointment_data.doctorId,
        });

        final_result = {
          doctorId: doctor_data._id,
          doctorImg: doctor_data.profileImg,
          doctorName: doctor_data.name,
          doctorUsername: doctor_data.username,
          patientId: userId,
        };
      }
    } else {
      final_result = false;

      message = "Can't fetch Visited Appointments..";
    }

    res.status(200).json({
      message,
      data: final_result,
      status: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Cannot find the Visited Appointments!",
      status: false,
    });

    console.log("Cannot find the Visited Appointments!");
  }
};
