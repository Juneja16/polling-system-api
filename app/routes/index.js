import express from "express";
import questionRoutes from "./question.routes.js";
import optionRoutes from "./option.routes.js";

const router = express.Router();

/*
Attach route modules
*/

router.use("/questions", questionRoutes);
router.use("/options", optionRoutes);

export default router;
