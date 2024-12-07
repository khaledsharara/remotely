const { db, auth } = require("../firebaseConfig");

const { createUserWithEmailAndPassword } = require("firebase/auth");

exports.createEmployee = async (req, res) => {
  try {
    const { email, password, name, role, managerUid } = req.body;

    console.log("req.body", req.body);
    if (!email || !password || !name || !role || !managerUid) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Fetch the manager's details
    const managerRef = db.ref(`managers/${managerUid}`);
    const managerSnapshot = await managerRef.once("value");

    console.log("managerSnapshot", managerSnapshot.val());
    if (!managerSnapshot.exists()) {
      return res.status(404).json({ error: "Manager not found." });
    }

    const managerData = managerSnapshot.val();

    // Create the new employee
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
      createdBy: {
        managerUid: managerUid,
        managerName: managerData.name,
      },
    };

    // Add the new employee to the database
    const employeeRef = db.ref("employees").child(uid);
    await employeeRef.set(newEmployee);

    // Add the employee's uid to the manager's employees list
    const managerEmployeesRef = managerRef.child("employees");
    const currentEmployees =
      (await managerEmployeesRef.once("value")).val() || [];
    const updatedEmployees = [...currentEmployees, uid];

    await managerEmployeesRef.set(updatedEmployees);

    return res.status(200).json({
      message:
        "Employee created successfully and added to manager's employees list.",
      data: {
        uid,
        name,
        email,
        role,
        createdBy: {
          managerUid,
          managerName: managerData.name,
        },
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

exports.getAllEmployees = async (req, res) => {
  try {
    const employeesRef = db.ref("employees");
    let employees = [];

    await employeesRef.once("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        employees.push(childSnapshot.val());
      });
    });

    return res.status(200).json({
      message: "Employees found",
      data: employees,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getEmployeeTasks = async (req, res) => {
  try {
    const { employeeUid } = req.query;

    if (!employeeUid) {
      return res.status(400).json({ error: "Employee UID is required." });
    }

    const employeeRef = db.ref(`employees/${employeeUid}`);
    const employeeSnapshot = await employeeRef.once("value");

    if (!employeeSnapshot.exists()) {
      return res.status(404).json({ error: "Employee not found." });
    }

    const employeeData = employeeSnapshot.val();
    const tasks = employeeData.tasks || {};

    // Format the tasks to include employee name
    const formattedTasks = Object.entries(tasks).map(([taskId, task]) => ({
      taskId,
      completed: task.completed,
      description: task.description,
      dueDate: task.dueDate,
      title: task.title,
      employeeName: employeeData.name || "Unknown", // Include employee name
    }));

    return res.status(200).json({
      message: "Employee tasks found",
      data: formattedTasks,
    });
  } catch (error) {
    console.error("Error fetching employee tasks:", error);
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
