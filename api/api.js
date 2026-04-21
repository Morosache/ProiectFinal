import http from "http";
const hostname = '0.0.0.0';
const port = 3000;
const server = http.createServer((req, res) => {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
        // "Access-Control-Max-Age": 2592000, // 30 days
        // /** add other headers as per requirement */
    };
    // res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200, headers)
    res.end('{"name": "Radu"}');
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});