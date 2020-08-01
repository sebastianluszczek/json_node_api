const fs = require('fs').promises;

const readJSONData = async (filePath) => {
    const raw_data = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw_data)
}

const writeJSONData = async (filePath, data) => {
    await fs.writeFile(filePath, JSON.stringify(data), 'utf8');
}

module.exports = {
    readJSONData,
    writeJSONData
}