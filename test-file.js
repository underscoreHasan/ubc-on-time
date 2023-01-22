const fs = require("fs");

const content = {
    name: "ddaasd",
    height: 123
};

fs.writeFile('./test.json', JSON.stringify(content), err => {
    if (err) {
        console.error(err);
    }
});