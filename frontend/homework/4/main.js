const {readEmployeeData} = require('./src/fileReader.js')
const {writeReport} = require('./src/reportGenerator.js')
const { generateSummaryReport, departmentReport, topEarners } = require('./src/reportGeneration');

const employees = readEmployeeData('./data/employee.json');
console.log(employees);

writeReport('./reports/employeeReport.txt', "This is emlployee report file");

//Command Line Arguments
const command = process.argv[2];
const value = process.argv[3];


if(command === 'summary'){
    generateSummaryReport(employees, './reports/summaryReport.txt');
}
else if(command === 'department'){
     if (value) {
        departmentReport(employees, value, `./reports/departmentReport.txt`);
    }
    else{
      console.log('Please provide a department name');
    }
}
else if(command === 'top'){
    const count = Number.parseInt(value);
    topEarners(employees, count, './reports/topEarners.txt');
}
else{
   generateSummaryReport(employees, './reports/summaryReport.txt');
   departmentReport(employees, "HR", './reports/departmentReport.txt')
   topEarners(employees, 3, './reports/topEarnersReport.txt')
}