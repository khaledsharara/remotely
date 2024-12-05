const { db, auth } = require("../firebaseConfig");

const { createUserWithEmailAndPassword } = require("firebase/auth");

exports.createEmployee = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    if (!email || !password || !name || !role) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { uid } = userCredential.user;

    const newEmployee = {
      uid,
      name,
      email,
      role,
    };

    const employeeRef = db.ref("employees").child(uid);
    await employeeRef.set(newEmployee);

    return res.status(200).json({
      message: "Employee created successfully",
      data: {
        uid,
        name,
        email,
        role,
      },
    });
  } catch (error) {
    console.error("Error creating employee:", error);
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
