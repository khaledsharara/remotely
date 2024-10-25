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

exports.getEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employeeRef = db.ref(`employees/${id}`);
    let employee = null;

    await employeeRef.once("value", (snapshot) => {
      employee = snapshot.val();
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json({
      message: "Employee found",
      data: employee,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
