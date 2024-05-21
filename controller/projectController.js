const Project = require('../models/project');
const User = require('../models/user');
const fs = require('fs');
const path = require('path');

const createProject = async(req, res) => {
    let body = req.body;
    let langArray = req.body.lang.split(',');

    let project =  new Project({
        name: body.name,
        description: body.description,
        lang: langArray,
        url: body.url,
        date: body.date,
        image: body.image,
        user: req.user._id
    });
    project.save()
            .then((projectDB) => {
                if(!projectDB) return res.status(400).send({
                    status: 'error',
                    message: 'Project already exists'
                })
                return res.status(201).send({
                    status: 'success',
                    project: projectDB,
                    user: req.user.id
                })
            })
}

const getProjects = (req, res) => {
    Project.find()
            .populate('user', "-__v")  
            .sort("-date")
            .then((projectDB) => {
                if(!projectDB) return res.status(400).send({
                    status: 'error',
                    message: 'Project not found'
                })
                return res.status(200).send({
                    status: 'success',
                    projects: projectDB
                })
            }).catch((err) => {
                return res.status(500).send({
                    status: 'error',
                    error: err.message
                })
            })
}

const getOneProject = async(req, res) => {
    let projectId =  req.params.id;

   await Project.findOne({_id: projectId})
                .populate('user')
                .then(async(projectDB) => {
                    if(!projectDB) return await res.status(400).send({
                        status: 'error',
                        error: 'Project not found'
                    })
                    return await res.status(200).send({
                        status: 'success',
                        project: projectDB
                    })
                })
                .catch((err) => {
                    return res.status(500).send({
                        status: 'error',
                        error: err.message
                    })
                }) 
            
            
}

const updateProject = (req, res) => {
    let projectId = req.params.id;
    let body = req.body;

    Project.findOneAndUpdate({_id: projectId}, body, {new: true})
            .then((projectDB) => {
                if(!projectDB) return res.status(400).send({
                    status: 'error',
                    error: 'Project not found'
                })
                return res.status(200).send({
                    status: 'success',
                    message: 'Project already updated',
                    project: projectDB
                })
            })  
}

const deleteProject = (req, res) => {
    let projectId = req.params.id;

    Project.findOneAndDelete({_id: projectId})
            .then((projectDB) => {
                if(!projectDB) return res.status(400).send({
                    status: 'error',
                    error: 'Project not found'
                })
                return res.status(200).send({
                    status: 'success',
                    message: 'Project already deleted',
                    project: projectDB
                })

            })
}

const uploadImage = (req, res) => {
    if(!req.file) return res.status(404).send({
        status: 'error',
        message: 'request invalid'
    })

    let fileName = req.file.originalname;
    let fileSplit = fileName.split("\.");
    let fileExt = fileSplit[1];

    if(fileExt != 'png' && fileExt != 'gif' && fileExt != 'jpg' && fileExt != 'jpeg'){
        fs.unlink(req.file.path, (error) => {
            return res.status(400).send({
                status: 'error',
                message: 'The file is not valid'
            })
        })
    }else{
        let projectId = req.params.id;

        Project.findOneAndUpdate({_id: projectId}, {image: req.file.filename}, {new: true})
                .then((projectDB) => {
                    if(!projectDB) return res.status(400).send({
                        status: 'error',
                        error: 'Project not found'
                    })
                    return res.status(200).send({
                        status: 'success',
                        message: 'Project successfully updated',
                        project: projectDB,
                        file: req.file
                    })
                })
                .catch((error) => {
                    return res.status(500).send({
                        status: 'error',
                        error: error.message
                    })
                })

    }
}

const getImage = (req, res) => {
    let file = req.params.file;
    let path_file = "./images/projects/" + file;

    fs.stat(path_file, (err, exist) => {
        if(exist){
            return res.sendFile(path.resolve(path_file))
        }else{
            return res.status(404).send({
                status: 'error',
                message: 'File not found',
                exist,
                file,
                path_file
            })
        }
    })
}
//  const searchProject = (req, res) => {
//     let search = req.params.search;
//     Project.find({"$or": [
//         {"name": {"$regex": search, "$options": "i"}}, 
//     ]})

//  }

module.exports = {
    createProject,
    getProjects,
    getOneProject,
    updateProject,
    deleteProject,
    uploadImage,
    getImage
}
