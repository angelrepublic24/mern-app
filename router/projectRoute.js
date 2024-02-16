const express = require('express');
const multer = require('multer');
const ProjectController = require('../controller/projectController');
const  {verifyToken} = require('../middlewares/authentication');

let router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        cb(null, './images/projects');
    },
    filename: (req, file, cb) => {
        cb(null, "project" + Date.now()+"-"+ file.originalname);
    }
})

const upload = multer({storage})

router.post('/createProject',verifyToken, ProjectController.createProject);
router.get('/projects/:last?', ProjectController.getProjects);
router.get('/project/:id', ProjectController.getOneProject);
router.put('/project/:id', verifyToken, ProjectController.updateProject);
router.delete('/deleteProject/:id', verifyToken, ProjectController.deleteProject);
router.post("/uploadImage/:id", [verifyToken, upload.single("file0")], ProjectController.uploadImage);
router.get('/getImage/:file', ProjectController.getImage);





module.exports = router;