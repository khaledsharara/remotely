const { db } = require("../firebaseConfig");

exports.addTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate } = req.body;

    if (!title || !description || !dueDate) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newTask = {
      title,
      description,
      dueDate,
      completed: false,
    };

    const tasksRef = db.ref(`employees/${id}/tasks`);
    await tasksRef.push(newTask);

    return res.status(200).json({
      message: "Task added successfully",
      data: newTask,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.createManager = async (req, res) => {
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

    const employeeRef = db.ref("managers").child(uid);
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

exports.getMyEmployees = async (req, res) => {
  try {
    const { managerUid } = req.query; // Extract managerUid from query

    if (!managerUid) {
      return res.status(400).json({ error: "Manager UID is required." });
    }

    const managerRef = db.ref(`managers/${managerUid}`);
    const managerSnapshot = await managerRef.once("value");

    if (!managerSnapshot.exists()) {
      return res.status(404).json({ error: "Manager not found." });
    }

    const managerData = managerSnapshot.val();
    const employeeUids = managerData.employees || [];

    if (employeeUids.length === 0) {
      return res.status(200).json({ message: "No employees found", data: [] });
    }

    const employeesRef = db.ref("employees");
    const employeesSnapshot = await employeesRef.once("value");

    const employees = [];
    employeesSnapshot.forEach((childSnapshot) => {
      const employeeData = childSnapshot.val();
      if (employeeUids.includes(employeeData.uid)) {
        employees.push(employeeData);
      }
    });

    return res.status(200).json({
      message: "Employees found",
      data: employees,
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return res.status(500).json({ error: error.message });
  }
};
