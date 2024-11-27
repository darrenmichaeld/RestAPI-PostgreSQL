const { Router } = require('express');
const controller  = require('./controller')

const router = Router();

router.get("/", controller.getStudents);
router.post("/", controller.addStudents);
router.delete('/:id', controller.deleteStudent);
router.put("/:id", controller.updateStudent);
router.get('/:id' , controller.getStudentsById);

module.exports = router;