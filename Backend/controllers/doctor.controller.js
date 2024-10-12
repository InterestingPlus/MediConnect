const Doctor = require("../models/doctor.model.js");

module.exports.addDoctor = async (req, res) => {
  try {
    const {
      username,
      password,
      name,
      age,
      specialization,
      contact,
      availability,
    } = req.body;

    const result = await Doctor.create({
      username,
      password,
      name,
      age,
      specialization,
      contact,
      availability,
    });

    console.log(
      `Doctor Created = Name : ${result.name} UserName : ${result.username} Specialization : ${specialization}`
    );

    return res.json({
      message: "Doctor Profile Created SuccessFully!",
      data: {
        id: result.id,
        username: req.body.name,
      },
      status: true,
    });
  } catch (err) {
    console.log("Error While Creating Doctor : ", err);

    res.json({
      message: "Failed to Create Doctor!",
      status: false,
    });
  }
};

module.exports.getDoctor = async (req, res) => {
  const data = await Doctor.find();

  res.json({
    message: "Data Loaded SuccessFully!",
    status: true,
    data,
  });
};
