const fs = require('fs');
const path = require('path')

function writeReport (filepath, content){
    try{
        const fileName = path.dirname(filepath);
        if(!fs.existsSync(fileName)){
            fs.mkdirSync(fileName);
        }
        fs.writeFileSync(filepath,content, 'utf-8');
    }
    catch(error){
        console.log(error.message);
    }
}

module.exports = {
    writeReport
}