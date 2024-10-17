const { db } = require("../firebaseConfig");

exports.createEmployee = async (req, res) => {
  try {
    const { name } = req.body;
    const newEmployee = {
      name,
    };

    const employeeRef = db.ref("employees").push();
    await employeeRef.set(newEmployee);

    return res.status(200).json({
      message: "Employee created successfully",
      data: newEmployee,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
