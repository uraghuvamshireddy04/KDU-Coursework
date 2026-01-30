// 1.2  Access and Modify Object Properties
function getEmployeeInfo(employee) {
    return `${employee.name} works in ${employee.department} and earns ${employee.salary}`;
}

function addSkill(employee, skill) {
    employee.skills.push(skill);
    return employee;
}

// 1.3 Object Methods
function getFullInfo(employee) {
    let skills = employee.skills.toString();
    return `${employee.name} of age ${employee.age} is working in ${employee.department} department and has ${skills} skills with salary ${employee.salary} with ${employee.experience} years expreience.`
}

// 2.2 Array Methods – Filter
function filterByExperience(employees, minExperince){
    return employees.filter(employee => employee.experience >= minExperince);
}

// 2.3  Array Methods – Map
function getSummary (employees) {
    const summaries =  employees.map(employee => {
        return `${employee.name} (${employee.department}) -- ${employee.salary}`;
    })
    return summaries;
}

//2.4 average salary
function calculatAverageSalary(employees) {
    const totalSalary = employees.reduce((acc, employee)=> acc+employee.salary, 0);
    return totalSalary/(employees.length);

}

// 2.4 count of each department
function departmentwiseEmployeeCount(employees) {
    return employees.reduce((acc, employee) => {
        if(acc[employee.department]){
            acc[employee.department]+=1;
        }
        else{
            acc[employee.department] = 1;
        }
        return acc;
    },{})
}

// 2.5 highest paid empoyee
function findHighestPaidEmployee(employees){
    return employees.reduce((highest,employee)=>{
        if(employee.salary > highest.salary){
            highest = employee;
        }
        return highest;
    })
}

// 2.5 sort by experience
function sortEmployeesByExperience(employees) {
    return [...employees].sort((a,b)=> b.experience - a.experience);
 
}

// 3.1 object destructring
function extractDetails(employee) {
    const {name, age, department, salary, skills} = employee;
    console.log(`${name} of age ${age} is working in ${department} department and has ${skills} skills with salary ${salary}`)
}

//3.2 array destructring
function maxSalary(employees) {
    const maxSalary = Math.max(...employees.map(e => e.salary));
    return employees.filter(e => e.salary === maxSalary);
}
function minSalary(employees) {
    const maxSalary = Math.min(...employees.map(e => e.salary));
    return employees.filter(e => e.salary === maxSalary);
}

// 3.3 Spread Operator
function mergeSkills (employee1, employee2) {
    const skills = [...new Set([...employee1.skills, ...employee2.skills])]
    console.log("Merge Skills without duplictaes: ",skills);
}

//3.4 Rest Operator
function restOperator(...args) {
    const size = args.length;
    const totalAge = args.reduce((acc, employee)=> acc+employee.age, 0);
    return {
        TotalEmployees: size,
        averageAge: totalAge/(size)
    };
    
}

//4.1 Employee Analytics
function getSkillFrequencyMap(employees) {
    const skills = [];
    for(const element of employees) {
        skills.push(...element.skills);
    }
    return skills.reduce((acc, skill) => {
        if(acc[skill]){
            acc[skill]+=1;
        }else{
            acc[skill] = 1;
        }
        return acc;
    },{})
}

// 1.1 Create Employee Objects
const employee1 = {
id: 1,
name: "Alice",
age: 30,
salary: 85000,
department: "Engineering",
skills: ["JavaScript", "React", "Node.js"],
experience: 5
}

const employee2 = {
id: 2,
name: "Adam",
age: 20,
salary: 35000,
department: "Engineering",
skills: ["JavaScript"],
experience: 1
}

const employee3 = {
id: 3,
name: "Alex",
age: 35,
salary: 185000,
department: "Finance",
skills: ["Management", "Finance", "Stocks", "Investment"],
experience: 9
}
const employee4 = {
id: 4,
name: "Bob",
age: 29,
salary: 80000,
department: "Engineering",
skills: ["JavaScript", "React", "Node.js", "Next.js"],
experience: 4
}

const employee5 = {
id: 5,
name: "Amar",
age: 32,
salary: 90000,
department: "Engineering",
skills: ["Java", "Python", "C++", "JavaScript", "React", "Node.js"],
experience: 7
}

const employeeCount = 5;

// 1.2
console.log("Employee Info :")
console.log(getEmployeeInfo(employee1));
console.log(getEmployeeInfo(employee2));
console.log(getEmployeeInfo(employee3));
console.log(getEmployeeInfo(employee4));
console.log(getEmployeeInfo(employee5));

console.log(addSkill(employee1, "Java"));
console.log(addSkill(employee2, "C++"));
console.log(addSkill(employee3, "Economics"));
console.log(addSkill(employee4, "Ruby"));
console.log(addSkill(employee5, "Go"));

// 1.3
console.log("Employee Full Info: ")
console.log(getFullInfo(employee1));
console.log(getFullInfo(employee2));
console.log(getFullInfo(employee3));
console.log(getFullInfo(employee4));
console.log(getFullInfo(employee5));


// 2.1  Create Employee Array
const employees = [employee1, employee2, employee3, employee4, employee5];
console.log(employees);

// 2.2
console.log("Filtering by Min Experience: ")
const minExperince = 5;
console.log(filterByExperience(employees, minExperince));

// 2.3
console.log("Employee Summaries: ")
console.log(getSummary(employees));

// 2.4
console.log("Average Salary:" ,calculatAverageSalary(employees));
console.log("Employee count by department: ", departmentwiseEmployeeCount(employees));

// 2.5
console.log("Highest paid employee: ",findHighestPaidEmployee(employees));
console.log("Sort employees by experience: ",sortEmployeesByExperience(employees));

// 3.1
extractDetails(employee1);

// 3.2
console.log("Max salried employee: ",maxSalary(employees));
console.log("Min salried employee: ",minSalary(employees));

// 3.3
mergeSkills(employee1, employee5);

//3.4
console.log("Using rest opeartor: ",restOperator(employee1, employee2, employee4));

//4.1
console.log("Skill Frequency Map: ",getSkillFrequencyMap(employees));






