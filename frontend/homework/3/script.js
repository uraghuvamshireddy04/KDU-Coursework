// 1.1 Task Constructor
function Task(title="A", priority="low"){
    this.id = Date.now();
    this.title = title;
    this.priority = priority;
    this.completed = false;
}

// 1.2 Add Methods to Task.prototype
Task.prototype.markComplete = function() {
    this.completed = true;
    return this;
}

Task.prototype.updatePriority = function(newPriority) {
    const priorities = ["low", "medium", "high"];

    if(priorities.includes(newPriority)){
        this.priority = newPriority;
    }
    else{
        throw new Error("Invalid priority mentioned");
    }
    return this;

}

Task.prototype.getInfo = function() {
    return `${this.title} has a priority ${this.priority}`;
}

// 1.4 Utility Method
Task.prototype.getAllTasksInfo = function(tasks) {
    if(tasks.length === 0){
        return "No tasks are present to get info";
    }
    return tasks.map(task => this.getInfo.call(task));
}

// 1.3 PriorityTask Constructor
function PriorityTask (title="A", priority="low", dueDate) {
        Task.call(this, title, priority);
        this.dueDate = dueDate;
    
}

PriorityTask.prototype = Object.create(Task.prototype);
PriorityTask.prototype.constructor = PriorityTask;

PriorityTask.prototype.getInfo = function() {
    let message = Task.prototype.getInfo.call(this);
    if(this.dueDate){
         message += ` and due date is ${this.dueDate}`;
    }
    return message;
}


const t1 = new Task("A","low");
const t2 = new Task("B", "high");
console.log(t1, t2);

t1.updatePriority("high").markComplete();
console.log("After updation Task 1:", t1);

const pt1 = new PriorityTask("C", "low", "1-1-2001");
console.log("PT1: ", pt1);

console.log("t1 info: ", t1.getInfo());
console.log("pt1 info: ", pt1.getInfo());

const tasks = [t1,t2,pt1];
console.log("All tasks: ", t1.getAllTasksInfo(tasks));

// part2 2.1 Create Task with Delay
const createTaskAsync = (title, priority) => {
    console.log("Creating tasks...")
    return new Promise((resolve, reject) => {
        if (!title || !priority) {
            reject(new Error("Title and priority are required"));
            return;
        }
        setTimeout(()=>{
            console.log("Task created...")
            const task = new Task(title,priority);
            resolve(task);
        },1000)

    })
}


async function createTask(title, priority) {
    try{
        return await createTaskAsync(title,priority);
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

try{
    console.log(await createTask("A","medium"));
}catch(error){
    console.log(error);
}


// 2.2: Demonstrate the Event Loop
const demonstrateEventLoop = () => {
    let output = "";
    setTimeout(() => {
        output += "1";
        console.log(output);
    }, 2000);
    setTimeout(() => {
        output += " → 4";
        console.log(output);
    }, 4000);
    setTimeout(() => {
        output += " → 3";
        console.log(output);
    }, 6000);
    setTimeout(() => {
        output += " → 2";
        console.log(output);
    }, 8000);
};

demonstrateEventLoop();

// 2.3 Chain Async Operations
async function createAndSaveTask(title, priority) {
    try{
        const task = await createTaskAsync(title, priority);
        const task2 = await createTaskAsync("task2", "low");
        console.log("Task created and saved successfully");
        return [task, task2];
    }catch(error) {
        console.log(error);
        throw error;
    }
}

try{
    console.log(await createAndSaveTask("A","medium"));
}catch(error){
    console.log(error);
}

// 2.4 Batch Task Creation
async function createMultipleTasksAsync(taskDataArray) {
    try {
        if(taskDataArray.length === 0){
            return "No tasks to perform";
        }
        const createdTasks = await Promise.all(taskDataArray.map(task => createTaskAsync(task.title, task.priority)));
        console.log("All tasks created!");
        return createdTasks;

    } catch (error) {
        console.error(error);
        throw error;
        
   }
}

const newTasks = [
    {title: "A", priority: "High"},
    {title: "B", priority: "Low"},
    {title: "C", priority: "Medium"}
    ];

try{
    console.log(await createMultipleTasksAsync(newTasks));
}
catch(error){
    console.log(error);
}