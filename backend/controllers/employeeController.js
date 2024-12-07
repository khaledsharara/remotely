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
