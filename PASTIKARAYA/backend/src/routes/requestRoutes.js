const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const admin = require("../middleware/admin");

const {
  createRequest,
  getRequests,
  getMyRequests,
  updateStatus,
  deleteRequest,
} = require("../controllers/requestController");

router.delete("/:id", auth, admin, deleteRequest);

router.post("/",auth,createRequest);

router.get("/me",auth,getMyRequests);

router.get("/",auth,admin,getRequests);

router.put("/:id",auth,admin,updateStatus);

router.delete("/:id", auth, admin, deleteRequest);



module.exports=router;