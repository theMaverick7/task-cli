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

    update(){}

    delete(){}

    markInProgress(){}

    markDone(){}


}

const allTasks = [
    {
        id: 1,
        description: 'eat breakfast',
        status: 'todo',
        createdAt: Date.toString(),
        updatedAt: Date.toString()
    },
    {
        id: 2,
        description: 'drink coffee',
        status: 'in-progess',
        createdAt: Date.toString(),
        updatedAt: Date.toString()
    },
    {
        id: 3,
        description: 'do workout',
        status: 'done',
        createdAt: Date.toString(),
        updatedAt: Date.toString()
    }
];

const addTask = (val) => {
    const date = Date.toString();
    const task = new Task(4, val, 'todo', date);
    allTasks.push(task);
    console.log(`task: '${value}' added`);
}

if(action === 'add')
    addTask(value);

if(action === 'list'){ 
    allTasks.forEach((task) => {
        console.log(task.description);
    })
}


// taking the inputs:
    // The user will intreact with the app through command line
    // all the operations will be done through command line arguments
    // convert the arguments to required datatype, as they are strings

// figure out how to implement for different arguments position

