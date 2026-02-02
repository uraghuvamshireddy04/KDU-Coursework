const fs = require('fs');

function readEmployeeData (employeeFile) {
    try{
        const employeeData = fs.readFileSync(employeeFile);
        const parsedData = JSON.parse(employeeData);
        return parsedData;

    }
    catch(error) {
        console.log(error.message);
        return [];
    }
}

module.exports = {
    readEmployeeData
}