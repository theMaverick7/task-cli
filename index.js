import { argv } from 'node:process';

const action = argv[2];
const value = argv[3];

class Task{
    constructor(id, description, status, createdAt, updatedAt){

        this.id = id;
        this.description = description;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    update(val){
        this.description = val;
    }

    markInProgress(val){
        this.status = 'in-progress';
    }

    markDone(val){
        this.status = 'done';
    }


}

const allTasks = [
    {
        id: 1,
        description: 'eat breakfast',
        status: 'todo',
        createdAt: (new Date).toString(),
        updatedAt: undefined
    },
    {
        id: 2,
        description: 'drink coffee',
        status: 'in-progress',
        createdAt: (new Date).toString(),
        updatedAt: undefined
    },
    {
        id: 3,
        description: 'do workout',
        status: 'done',
        createdAt: (new Date).toString(),
        updatedAt: undefined
    }
];

const addTask = (val) => {
    const date = Date.toString();
    const task = new Task(4, val, 'todo', date);
    allTasks.push(task);
    console.log(`task: '${value}' added`);
}

// const argTypeCheck = (arg) => {
//     return isNaN(parseInt(arg));
// }

if(action === 'add'){
    addTask(value);
}

if(action === 'update'){
    console.log(allTasks)
    const id = parseInt(argv[3]);
    const updateValue = argv[4];
    const task = allTasks.find((task) => task.id === id);
    task.description = updateValue;
    task.updatedAt = (new Date()).toString();
    console.log(`task: '${task.id}' updated`);
    console.log(allTasks);
}

if(action === 'mark-in-progress'){
    const id = parseInt(argv[3]);
    const task = allTasks.find((task) => task.id === id);
    task.status = 'in-progress';
    console.log(`task: '${task.description}' marked as in-progress `);
}

if(action === 'mark-done'){
    const id = parseInt(argv[3]);
    const task = allTasks.find((task) => task.id === id);
    task.status = 'done';
    console.log(`task: '${task.description}' marked as done `);
}


if(action === 'list'){

    if(argv[3] === 'done'){
        const res = allTasks.filter((task) => {
            if(task.status === 'done'){
                return task;
            }
        });
        res.forEach( (task) => {
            console.log(task.description);
        })
    }

    if(argv[3] === 'in-progress'){
        const res = allTasks.filter((task) => task.status === 'in-progress');
        res.forEach((task) => console.log(task.description));
    }

    if(argv[3] === 'todo'){
        const res = allTasks.filter((task) => task.status === 'todo');
        res.forEach((task) => console.log(task.description));
    }

    if(!argv[3]){
        console.log('Burp');
        allTasks.forEach((task) => {
            console.log(task.description);
        })
    }
}

if(action === 'delete'){
    const id = parseInt(argv[3]);
    const task = allTasks.find((task) => task.id === id);
    allTasks.splice(allTasks.indexOf(task), 1);
    console.log(`${task.description} deleted`);
    console.log(allTasks);
}


// taking the inputs:
    // The user will intreact with the app through command line
    // all the operations will be done through command line arguments
    // convert the arguments to required datatype, as they are strings

// figure out how to implement for different arguments position

