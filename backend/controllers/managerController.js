const { db } = require("../firebaseConfig");

exports.addTask = async (req, res) => {
  try {
    const { uids, title, description, dueDate } = req.body;

    // Validate the inputs
    if (!uids || !Array.isArray(uids) || uids.length === 0) {
      return res
        .status(400)
        .json({ error: "A valid array of UIDs is required." });
    }

    if (!title || !description || !dueDate) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newTask = {
      title,
      description,
      dueDate,
      completed: false,
    };

    // Iterate over UIDs and assign the task to each
    const taskPromises = uids.map(async (uid) => {
      const tasksRef = db.ref(`employees/${uid}/tasks`);
      await tasksRef.push(newTask);
    });

    // Wait for all tasks to be assigned
    await Promise.all(taskPromises);

    return res.status(200).json({
      message: "Task added successfully to all specified employees",
      data: newTask,
    });
  } catch (error) {
    console.error("Error adding task:", error);
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

exports.addChecklistItem = async (req, res) => {
  try {
    const { uid, taskId, title } = req.body;

    if (!uid || !taskId || !title) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const taskRef = db.ref(`employees/${uid}/tasks/${taskId}`);
    const taskSnapshot = await taskRef.once("value");

    if (!taskSnapshot.exists()) {
      return res.status(404).json({ error: "Task not found." });
    }

    const taskData = taskSnapshot.val();
    const checklist = taskData.checklist || [];

    const newChecklistItem = {
      title,
      status: false,
    };

    checklist.push(newChecklistItem);

    await taskRef.update({ checklist });

    return res.status(200).json({
      message: "Checklist item added successfully",
      data: newChecklistItem,
    });
  } catch (error) {
    console.error("Error adding checklist item:", error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const { taskId } = req.query;

    if (!taskId) {
      return res.status(400).json({ error: "Task ID is required." });
    }

    const employeesRef = db.ref("employees");
    const employeesSnapshot = await employeesRef.once("value");

    let taskData = null;
    employeesSnapshot.forEach((employeeSnapshot) => {
      const tasks = employeeSnapshot.val().tasks || {};
      const task = Object.values(tasks).find((t) => t.id === taskId);
      if (task) {
        taskData = task;
      }
    });

    if (!taskData) {
      return res.status(404).json({ error: "Task not found." });
    }

    return res.status(200).json({
      message: "Task found",
      data: taskData,
    });
  } catch (error) {
    console.error("Error fetching task:", error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getMyEmployeesTasks = async (req, res) => {
  try {
    const { managerUid } = req.query;

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

    const tasks = [];
    employeesSnapshot.forEach((childSnapshot) => {
      const employeeData = childSnapshot.val();
      if (employeeUids.includes(employeeData.uid)) {
        const employeeTasks = Object.values(employeeData.tasks || {});
        employeeTasks.forEach((task) => {
          tasks.push({
            ...task,
            employeeName: employeeData.name,
          });
        });
      }
    });

    return res.status(200).json({
      message: "Tasks found",
      data: tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({ error: error.message });
  }
};
