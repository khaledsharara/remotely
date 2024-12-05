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
