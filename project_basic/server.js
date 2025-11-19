import http from "http";

let server;
let maxtries = 0;

process.on('error', (error) => {
    console.log(error, 'process error')
})

process.on('uncaughtException', (error) => {
    console.log("CRASH:", error.message);
    server.closeAllConnections()
    server.close();
    console.log("Restarting server...");
    console.log('uncaught exeption', error)
    console.log(maxtries);
    if(maxtries == 5) return;
    startServer();
})

function createServer() {
    server = http.createServer();
    server.on('listening', function () {
        console.log('server started successfully')
    })

    server.on('error', (error) => {
        console.log(error, 'error console');
    })
}

function startServer() {
    createServer();
    
    maxtries++;

    server.listen(3002, () => {
        console.log('server started and listining on 3002')
        setTimeout(() => {
            throw new Error('server stopped, unexpected error occured')
        }, 2000)
    })
}


startServer();
