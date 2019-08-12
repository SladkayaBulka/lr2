var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://anima:123@ds247499.mlab.com:47499/mytasklist_nik',['tasks']);

//Get all tasks
router.get('/tasks',function(req, res, next){
    db.tasks.find(function(err, tasks){
        if (err){
            res.send(err);
        }
        res.json(tasks);
    })
})
//Get single task
router.get('/tasks/:id',function(req, res, next){
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, task){
        if (err){
            res.send(err);
        }
        res.json(task);
    })
})

//Save Task
router.post('/task',function(res, req, next){
    var task = req.body;
    if (!task.title || (task.isDone + '')){
        res.status(400);
        res.json({
            "error":"Bad data"
        })
    }
    else{
        db.task.save(task, function(err, task){
            if (err){
                res.send(err);
            }
            res.json(task);
        })
    }
})

//Delete task
router.delete('/tasks/:id',function(req, res, next){
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)},function(err, task){
        if (err){
            res.send(err);
        }
        res.json(task);
    })
})

//Update task
router.put('/tasks/:id',function(req, res, next){
    var task = req.body;
    var updTask = {};

    if (task.isDone){
        updTask.isDone = task.isDone;
    }

    if (task.title){
        updTask.title = task.title;
    }

    if (!updTask){
        res.status(400);
        res.json({
            "error":"bad Data"
        })
    }
    else{
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)},updTask,{},function(err, task){
            if (err){
                res.send(err);
            }
            res.json(task);
        })
    }

})

module.exports = router;