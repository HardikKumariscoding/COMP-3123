var http = require("http");
console.log("Lab 03 - NodeJs");
const employees = require('./employee'); 
console.log('Employees:', employees); 

const port = process.env.PORT || 8081;

const server = http.createServer((req, res) => {
    if (req.method !== 'GET') {
        res.writeHead(405, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: http.STATUS_CODES[405] }));
        return;
    }

    if (req.url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Welcome to Lab Exercise 03</h1>');
    } else if (req.url === '/employee') {
        console.log("display employee");
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(employees, null, 2));
    } else if (req.url === '/employee/names') {
        const employeeNames = employees
            .map(emp => `${emp.firstName} ${emp.lastName}`)
            .sort();
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(employeeNames));
    } else if (req.url === '/employee/totalsalary') {
        const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0); 
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ total_salary: totalSalary }));
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: http.STATUS_CODES[404] }));
    }
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
