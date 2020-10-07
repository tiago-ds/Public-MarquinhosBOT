const fs = require('fs');
module.exports = {
    read(parameter, filename){
        let content = JSON.parse(fs.readFileSync(`./configs/${filename}.json`, 'utf8'));
        return content[parameter];
    },
    edit(parameter, newValue, filename) {
        let content = JSON.parse(fs.readFileSync(`./configs/${filename}.json`, 'utf8'));
        content[parameter] = newValue;
        fs.writeFileSync(`./configs/${filename}.json`, JSON.stringify(content));
    }
}