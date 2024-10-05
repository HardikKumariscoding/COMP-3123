const http = require("http");
const employees = require("./employee"); // Ensure this path is correct

console.log("Lab 03 - NodeJs");

// Define Server Port
const port = process.env.PORT || 8081;

// Create Web Server using CORE API
const server = http.createServer((req, res) => {
    if (req.method !== 'GET') {
        res.writeHead(405, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({error: http.STATUS_CODES[405]}));
        return;
    }

    switch (req.url) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end("<h1>Welcome to Lab Exercise 03</h1>");
            break;

        case '/employee':
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(employees));
            break;

        case '/employee/names':
            // Fixed template literals, now properly enclosed in backticks
            const names = employees.map(emp => `${emp.firstName} ${emp.lastName}`).sort();
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(names));
            break;

        case '/employee/totalsalary':
            const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({total_salary: totalSalary}));
            break;

        default:
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({error: http.STATUS_CODES[404]}));
            break;
    }
});

server.listen(port, () => {
    // Corrected the use of template literals in console.log
    console.log(`Server listening on port ${port}`);
});

