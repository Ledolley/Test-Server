const { Router } = require ("express");
const router = Router ();


//Imports services

const { getUsers, getUserbyId, createUser, updateUser, deleteUser } = require("../controllers/users.controller");
const { getTasks, getTaskbyId, createTask, deleteTask } = require("../controllers/todo.controller");

//Users routes
router.get("/users", getUsers);
router.get("/users/:id", getUserbyId);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

//Users routes
router.get("/tasks", getTasks);
router.get("/tasks/:id", getTaskbyId);
router.post("/task", createTask);
router.delete("/task/:id", deleteTask);

module.exports = router;