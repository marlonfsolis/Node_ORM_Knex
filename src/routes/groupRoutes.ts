import {Router} from "express";

import * as GroupController from "../controllers/groupController";
import {groupValidator} from "../models/Group.model";


const router = Router();

/* GET groups. */
router.get('/', GroupController.getGroups);

/* POST a group */
router.post('/', groupValidator(), GroupController.createGroup);

/* PUT a groups */
// router.put('/:name', groupValidator(), GroupController.updateGroup);

/* DELETE a groups */
router.delete('/:name', GroupController.deleteGroup);

/* GET a groups */
// router.get('/:name', GroupController.getGroup);

// export const usersRoutes = router;
export default router;
