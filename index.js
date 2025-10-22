#!/usr/bin/env node

import { argv } from 'node:process';
import { readFileSync, accessSync } from 'node:fs';
import { writeFile, constants } from 'node:fs/promises';

const action = argv[2];
const filePath = 'tasks.json';

class Task{
    constructor(id, description, status){
        this.id = id;
        this.description = description;
        this.status = status;
        this.createdAt = (new Date()).toString();
    }
}

const fileExist = () => {
       try{
           accessSync(filePath, constants.F_OK);
           return true;
       }catch(e){
           return false;
       }
}

const readJsonFile = () => {
        const parsed = JSON.parse(readFileSync(filePath, 'utf8'));
        if (!parsed.length) {
            throw Error('No task found');
        } else {
            return parsed;
        }
}

const initFileContent = async (val) => {
    try{
        const task = new Task(1, val, 'todo');
        await writeFile(filePath, JSON.stringify([task]), 'utf8');
        console.log('task added');
    }catch (e) {
        throw e;
    }
}

const addTask = async() => {
    const val = argv[3];
    //const regex = /".*?,"/

    try {
        await validations(null, val, async() => {
            try{
                let parsedData = readJsonFile();
                let lastId = parsedData[parsedData.length - 1].id;
                const task = new Task(++lastId, val, 'todo');
                parsedData.push(task);
                await writeFile(filePath, JSON.stringify(parsedData), 'utf8');
                console.log('task added');
            }catch(e){
                await initFileContent(val);
            }

        })
    } catch(e) {
        console.error(e.message);
    }
}

const listTasks = async(status) => {

    try{
        await validations(null, null, async() => {
            const parsedData = readJsonFile();
            let tasks;

            if(status)
                tasks = parsedData.filter((task) => task ? task.status === status : '');
            else{
                tasks = parsedData;
            }

            if(!tasks.length){
                throw Error(`No task ${status}`);
            }else{
                tasks.forEach(task => {
                    task ? console.log(`${task.description} (id: ${task.id}${!status?`, status: ${task.status}`:''})`) : '';
                })
            }
        })
    }catch (e) {
        console.error(e.message);
    }

}

const checkValue = (val) => {
    if (!val) {
        throw Error(`value required`);
    } else if (Number.isInteger(parseInt(val))) {
        throw Error(`value must be a valid string`);
    }
}

const checkId = (id) => {
    if (!id) {
        throw Error(`id required`);
    } else if (!Number.isInteger(parseInt(id))) {
        throw Error(`id must be a number`);
    }
}

const validations = async (id, value, cb) => {

    function checkForFile(){
        if(!fileExist()) throw Error(`No task found`);
    }

    try{

        if(action === 'delete' || action === 'mark-in-progress' || action === 'mark-done'){
            checkId(id);
            checkForFile();
            cb();
        }else if(action === 'update'){
            checkId(id);
            checkValue(value);
            checkForFile();
            cb();
        }else if(action === 'list'){
            checkForFile();
            cb();
        }else if(action === 'add'){
            checkValue(value);
            !fileExist() ? await initFileContent(value) : cb();
        }

    }catch (e) {
        throw e;
    }
}

const updateStatus = async(status) => {
    const id = argv[3];
    try{
        await validations(id, null, async() => {
            const parsedData = readJsonFile();
            
            const taskIndex = parsedData.findIndex((task) => task ? task.id === parseInt(id) : '');
            if(taskIndex === -1) throw Error('no task to mark for that id');
            parsedData[taskIndex].status = status;
            await writeFile(filePath, JSON.stringify(parsedData), 'utf8');
            console.log('task marked');
        })

    }catch (e) {
        console.error(e.message);
    }
}

if(action === 'add'){
    await addTask();
}

if(action === 'list'){

    const flag = argv[3];

    if(flag === 'done'){
        await listTasks('done');
    }else if(flag === 'in-progress'){
        await listTasks('in-progress');
    }else if(flag === 'todo'){
        await listTasks('todo');
    }else if(!flag){
        await listTasks(null);
    }else {
        console.error('Enter valid argument');
    }
}

if(action === 'update'){
    const id = argv[3];
    const value = argv[4];

    try{
        await validations(id, value, async() => {
            const parsedData = readJsonFile();
            const taskIndex = parsedData.findIndex((task) => task ? task.id === parseInt(id) : '');
            if(taskIndex === -1) throw Error('no task to update for that id');
            parsedData[taskIndex].description = value;
            parsedData[taskIndex].updatedAt = (new Date).toString();
            await writeFile(filePath, JSON.stringify(parsedData), 'utf8');
            console.log('task updated');
        })

    }catch (e) {
        console.error(e.message);
    }
}

if(action === 'delete'){
    const id = argv[3];

    try{
        await validations(id, null, async() => {
            const parsedData = readJsonFile();
            const taskIndex = parsedData.findIndex((task) => task ? task.id === parseInt(id) : '');
            if(taskIndex === -1){
                throw Error('no task found for that id');
            }
            //parsedData.splice(taskIndex,1);
            parsedData[taskIndex] = null;
            await writeFile(filePath, JSON.stringify(parsedData), 'utf8');
            console.log('task removed');
        })

    }catch (e) {
        console.error(e.message);
    }
}

if(action === 'mark-in-progress'){
    await updateStatus('in-progress');
}

if(action === 'mark-done'){
    await updateStatus('done');
}