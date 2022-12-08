import express from "express";

import * as IndexController from "../controllers/indexController";


const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, _next) {
  res.status(200).send("Express Index page");
});

/**
 * GET Not found handler
 */
router.get('/not-found', IndexController.pageNotFound);

export default router;
