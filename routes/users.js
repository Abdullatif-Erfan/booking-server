import express from "express";
import { updateUser, deleteUser, getUser, getUsers } from "../controllers/user.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("Hello user, you are authenticated");
// });

// router.get('/checkUser/:id', verifyUser ,(req, res, next) => {
//   res.send("This user is authorized");
// });

// router.get('/checkAdmin/:id', verifyAdmin ,(req, res, next) => {
//   res.send("Hello Admin, You are allowed to delete all accounts ");
// });


router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);
router.get("/:id", verifyUser, getUser);
router.get("/", verifyAdmin, getUsers);



export default router;
