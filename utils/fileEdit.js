const fs = require('fs');
module.exports = {
    read(parameter){
        let content = JSON.parse(fs.readFileSync(`./configs/global.json`, 'utf8'));
        return content[parameter];
    },
    edit(parameter, newValue) {
        let content = JSON.parse(fs.readFileSync(`./configs/global.json`, 'utf8'));
        content[parameter] = newValue;
        fs.writeFileSync(`./configs/global.json`, JSON.stringify(content));
    }
}