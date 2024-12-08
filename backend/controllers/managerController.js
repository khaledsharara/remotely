const { db } = require("../firebaseConfig");

exports.addTask = async (req, res) => {
  try {
    const { uids, title, description, dueDate, checklist } = req.body;

    // Validate the inputs
    if (!uids || !Array.isArray(uids) || uids.length === 0) {
      return res
        .status(400)
        .json({ error: "A valid array of UIDs is required." });
    }

    if (!title || !description || !dueDate) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (!Array.isArray(checklist)) {
      return res
        .status(400)
        .json({ error: "Checklist must be a valid array of items." });
    }

    // Validate checklist items
    for (const item of checklist) {
      if (
        typeof item.id !== "number" ||
        typeof item.text !== "string" ||
        typeof item.status !== "boolean"
      ) {
        return res.status(400).json({
          error: "Each checklist item must have an id, text, and status.",
        });
      }
    }

    const newTask = {
      title,
      description,
      dueDate,
      completed: false,
      checklist, // Add the checklist as a sub-object
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

exports.getTaskById = async (req, res) => {
  try {
    const { taskId } = req.query;

    if (!taskId) {
      return res.status(400).json({ error: "Task ID is required." });
    }

    const employeesRef = db.ref("employees");
    const employeesSnapshot = await employeesRef.once("value");

    let taskData = null;
    let assignedEmployeeName = null;

    employeesSnapshot.forEach((employeeSnapshot) => {
      const employeeData = employeeSnapshot.val();
      const tasks = employeeData.tasks || {};

      Object.entries(tasks).forEach(([taskKey, task]) => {
        if (taskKey === taskId) {
          taskData = { ...task, id: taskKey }; // Add the ID to the task object
          assignedEmployeeName = employeeData.name; // Assuming `name` is the field for the employee's name
        }
      });
    });

    if (!taskData) {
      return res.status(404).json({ error: "Task not found." });
    }

    return res.status(200).json({
      message: "Task found",
      data: {
        task: taskData,
        assignedEmployee: assignedEmployeeName,
      },
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
        const employeeTasks = employeeData.tasks || {};
        Object.keys(employeeTasks).forEach((taskId) => {
          const task = employeeTasks[taskId];
          tasks.push({
            taskId,
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

exports.updateTaskChecklist = async (req, res) => {
  try {
    const { taskId, updatedChecklist } = req.body;

    // Validate inputs
    if (!taskId || typeof taskId !== "string") {
      console.log("Task ID:", taskId);
      return res.status(400).json({ error: "Task ID is required." });
    }

    if (!Array.isArray(updatedChecklist)) {
      console.log("Checklist:", updatedChecklist);
      return res
        .status(400)
        .json({ error: "Updated checklist must be a valid array of items." });
    }

    // Validate checklist items
    for (const item of updatedChecklist) {
      if (
        typeof item.id !== "number" ||
        typeof item.text !== "string" ||
        typeof item.status !== "boolean"
      ) {
        console.log("Checklist item:", item);
        return res.status(400).json({
          error: "Each checklist item must have an id, text, and status.",
        });
      }
    }

    const employeesRef = db.ref("employees");
    const employeesSnapshot = await employeesRef.once("value");

    let taskRef = null;

    // Find the task and get its reference
    employeesSnapshot.forEach((employeeSnapshot) => {
      const employeeTasks = employeeSnapshot.child("tasks").val() || {};

      if (taskId in employeeTasks) {
        taskRef = db.ref(`employees/${employeeSnapshot.key}/tasks/${taskId}`); // Reference to the task
      }
    });

    if (!taskRef) {
      return res.status(404).json({ error: "Task not found." });
    }

    // Update the checklist field
    await taskRef.update({ checklist: updatedChecklist });

    return res.status(200).json({
      message: "Task checklist updated successfully.",
      data: { taskId, updatedChecklist },
    });
  } catch (error) {
    console.error("Error updating task checklist:", error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getEmployeeInfo = async (req, res) => {
  try {
    const { uid } = req.query;

    if (!uid) {
      return res.status(400).json({ error: "Employee UID is required." });
    }

    const employeeRef = db.ref(`employees/${uid}`);
    const employeeSnapshot = await employeeRef.once("value");

    if (!employeeSnapshot.exists()) {
      return res.status(404).json({ error: "Employee not found." });
    }

    const employeeData = employeeSnapshot.val();
    const tasks = employeeData.tasks || [];

    return res.status(200).json({
      message: "Employee found",
      data: {
        ...employeeData,
        tasks,
      },
    });
  } catch (error) {
    console.error("Error fetching employee:", error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getEmployeeLogs = async (req, res) => {
  try {
    const { uid } = req.body;

    const logRef = db.ref("logs");
    const logs = [];

    await logRef.once("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().uid === uid) {
          logs.push(childSnapshot.val());
        }
      });
    });

    return res.status(200).json({
      message: "Logs found",
      data: logs,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
