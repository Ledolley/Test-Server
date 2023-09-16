const { Router } = require ("express");
const router = Router ();


//Imports services

const { getUsers, getUserbyId, createUser, updateUser, deleteUser } = require("../controllers/users.controller");
const { loginUser, freshToken, logOut, resetPassword, forgotPassword } = require("../controllers/auth.controller");
const { authenticateToken } = require("../middlewares/auth");
const { getUniversity, getUniversitybyId, createUniversity, updateUniversity, deleteUniversity } = require("../controllers/university.controller");
const { getCourses, getCoursesbyId, createCourses, deleteCourses, updateCourses } = require("../controllers/courses.controller");
const { getQuestions, getQuestionsbyId, createQuestions, updateQuestions, deleteQuestions } = require("../controllers/questions.controller");
const { getRol, getRolbyId, createRol, deleteRol } = require("../controllers/rol.controller");
const { getTokens } = require("../controllers/tokens.controller");
const { createCertificate, getCertificatebyId, updateCertificate } = require("../controllers/certificate.controller");


//Users routes
router.get("/users", getUsers);
router.get("/users/:id", getUserbyId);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

//Auth routes
router.post("/users/login", loginUser );
router.get("/refresh_token", freshToken);
router.delete("/refresh_token", logOut);
router.patch("/users/reset-password", resetPassword);
router.post("/users/forgot-password", forgotPassword)


//University routes
router.get("/university", getUniversity);
router.get("/university/:id", getUniversitybyId);
router.post("/university", createUniversity);
router.put("/university/:id", updateUniversity);
router.delete("/university/:id", deleteUniversity);


//Courses routes
router.get("/courses", getCourses);
router.get("/courses/:id", getCoursesbyId);
router.post("/courses", createCourses);
router.delete("/courses/:id", deleteCourses);
router.patch("/courses/:id", updateCourses);

//Questions routes
router.get("/questions", getQuestions);
router.get("/questions/:id", getQuestionsbyId);
router.post("/questions", createQuestions);
router.patch("/questions/:id", updateQuestions)
router.delete("/questions/:id", deleteQuestions);

//Rol routes
router.get("/rol", getRol);
router.get("/rol/:id", getRolbyId);
router.post("/rol", createRol);
router.delete("/rol/:id", deleteRol);

//Tokens routes
router.get("/tokens", getTokens);

//Certificate routes
router.post("/certificate", createCertificate);
router.get("/certificate", getCertificatebyId);
router.patch("/certificate", updateCertificate);


module.exports = router;