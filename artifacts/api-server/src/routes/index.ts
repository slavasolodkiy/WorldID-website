import { Router, type IRouter } from "express";
import healthRouter from "./health";
import statsRouter from "./stats";
import ecosystemRouter from "./ecosystem";
import orbRouter from "./orb";
import teamRouter from "./team";
import newsletterRouter from "./newsletter";

const router: IRouter = Router();

router.use(healthRouter);
router.use(statsRouter);
router.use(ecosystemRouter);
router.use(orbRouter);
router.use(teamRouter);
router.use(newsletterRouter);

export default router;
