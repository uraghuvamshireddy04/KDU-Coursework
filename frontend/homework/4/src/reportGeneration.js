const fs = require('fs');
const path = require('path')

//Summary Report
function generateSummaryReport(employees, outputPath) {
    try{
        const fileName = path.dirname(outputPath);
        if(!fs.existsSync(fileName)){
            fs.mkdirSync(fileName);
        }
        const totalEmployees = employees.length;
        const totalSalary = employees.reduce((acc, e)=> acc + e.salary, 0);
        let averageSalary = 0;
        if(totalEmployees !== 0){
            averageSalary = totalSalary / totalEmployees;
        }
        let data = `
            totalEmployees: ${totalEmployees},
            totalSalary: ${totalSalary},
            averageSalary: ${averageSalary}
            `
        const departmentStats = {};

        employees.forEach(emp => {
        if (!departmentStats[emp.department]) {
          departmentStats[emp.department] = {
            count: 0,
            totalSalary: 0
          };
        }
        departmentStats[emp.department].count++;
        departmentStats[emp.department].totalSalary += emp.salary;
      });
        for (const dept in departmentStats) {
            const stats = departmentStats[dept];
            let averageSalary = (stats.totalSalary / stats.count);

        data += `
        Department : ${dept}
        Employees     : ${stats.count}
        totalSalary  : ${stats.totalSalary}
        averageSalary: ${averageSalary}
        `;
        }
        fs.writeFileSync(outputPath, data, 'utf-8' );

    }
    catch(error){
        console.log(error.message);
    }
}

//Department Report
function departmentReport (employees, department, outputPath){
    try{
        const fileName = path.dirname(outputPath);
        if(!fs.existsSync(fileName)){
            fs.mkdirSync(fileName);
        }

        let count = 0;
        let totalSalary = 0;

        employees.forEach(emp => {
            if(emp.department === department){
                count++;
                totalSalary += emp.salary;
            }
      });
        let averageSalary = 0;
        if(count !== 0){
            averageSalary = totalSalary / count;
        }        let data = `
        Department : ${department}
        totalEmployees     : ${count}
        totalSalary  : ${totalSalary}
        averageSalary: ${averageSalary}
        `;
        employees.forEach(emp => {
            if(emp.department === department){
                data += `
                Employee Name: ${emp.name}
                Employee Salary: ${emp.salary}
                `
            }
      });
        fs.writeFileSync(outputPath, data, 'utf-8' );

    }
    catch(error){
        console.log(error.message);
    }
}

//top Earners
function topEarners(employees, count, outputPath){
     try{
        const fileName = path.dirname(outputPath);
        if(!fs.existsSync(fileName)){
            fs.mkdirSync(fileName);
        }
        if(count > employees.length){
            count = employees.length;
            console.log("Number of employees required is more");
        }
        const sortedEmployees = [...employees].sort((e1, e2) => e2.salary - e1.salary);
        const earners = sortedEmployees.slice(0,count);
        let data = "";
        let rank = 1;
        earners.forEach(emp => {
            data += `
            Rank: ${rank}
            Name: ${emp.name}
            Department: ${emp.department}
            Salary: ${emp.salary}
            `
            rank++;
        })
        fs.writeFileSync(outputPath, data, 'utf-8' );

    }
    catch(error){
        console.log(error.message);
    }
}

module.exports = {
    generateSummaryReport,
    departmentReport,
    topEarners
}
