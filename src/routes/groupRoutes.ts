import {Router} from "express";

import * as GroupController from "../controllers/groupController";
import {groupValidator} from "../models/Group";


const router = Router();

/* GET permissions. */
router.get('/', GroupController.getGroups);

/* POST a group */
router.post('/', groupValidator(), GroupController.createGroup);

/* PUT a permission */
// router.put('/:name', permissionValidator(), PermissionController.updatePermission);

/* DELETE a permission */
// router.delete('/:name', PermissionController.deletePermission);

/* GET a permission */
// router.get('/:name', PermissionController.getPermission);

// export const usersRoutes = router;
export default router;
