const { db } = require("../firebaseConfig");

exports.getUserInfo = async (req, res) => {
  try {
    const { uid } = req.body;

    const employeeRef = db.ref("employees");
    const managerRef = db.ref("managers");

    let user = null;
    let userRole = null;

    await employeeRef.once("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().uid === uid) {
          user = childSnapshot.val();
          userRole = "employee";
        }
      });
    });

    if (!user) {
      await managerRef.once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.val().uid === uid) {
            user = childSnapshot.val();
            userRole = "manager";
          }
        });
      });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User found",
      data: user,
      role: userRole,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
