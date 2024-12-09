import { Task } from '../models/tasks.js';
import logger from '../logs/logger.js';

async function getTasks(req, res) {
    const { userId } = req.user;
    const { name } = req.body;
    try {
        const tasks = await Task.findAll({
            attributes: ['id', 'name', 'done'],
            order: ['name', 'ASC'],
            where: {
                UserId: userId,
            },
        });
        res.json(tasks);

    }catch(err){
        logger.error('Error getTasks: '+err);
        res.status(500).json({message: 'Server error getting tasks'})
    }
}

async function createTask(req, res){
    const { userId } = req.user;
    const { name } = req.body;
    try {
        const task = await Task.create({
            name,
            UserId: userId,
        });
        res.json(task);
    }catch(err){
        logger.error('Error createTasks: '+err);
        res.status(500).json({message: 'Server error creating task'})
    }
}
async function getTask(req, res) {
    const { userId } = req.user;
    const { id } = req.params;
    try {
        const task = await Task.findOne({
            attributes: ['name', 'done'],
            where: {
                id,
                UserId:userId,
            },
        });
        res.json(task);

    }catch(err){
        logger.error('Error getTask: '+err);
        res.status(500).json({message: 'Server error getting task'})
    }
}

async function updateTask(req, res) {
    const { userId } = req.user;
    const { id } = req.params;
    const { name } = req.body;
    try {
        const task = await Task.update({name}, {where: {id,UserId:userId}});
        if (task[0] === 0)
            return res.status(404).json({message: 'Task not found'});
        res.json(task);

    }catch(err){
        logger.error('Error getTask: '+err);
        res.status(500).json({message: 'Server error getting task'})
    }
}

async function taskDone(req,res){
    const { userId }= req.user;
    const {id} = req.params;
    const { done } = req.body;

    try{
        const task = await Task.update({ done }, {where: { id, userId } });
        if (task[0] === 0)
            return res.status(404).json({message: 'Task not found'});
        res.json(task);

    }catch(err){
        logger.error('Error taskDone: '+err);
        res.status(500).json({message: 'Server error'})
    }
}

async function deleteTask(req,res){
    const { userId }= req.user;
    const {id} = req.params;

    try{
        const task = await Task.destroy({ done }, {where: { id, userId } });
        //destroy no es recomendado, solo por temas didacticos
        if (task[0] === 0)
            return res.status(404).json({message: 'Task not found'});
        res.json(task);

    }catch(err){
        logger.error('Error deleteTask: '+err);
        res.status(500).json({message: 'Server error'})
    }
}
export default {
    getTasks,
    createTask,
    getTask,
    updateTask,
    taskDone,
    deleteTask,
}

