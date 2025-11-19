import http from "http";
import app from "./src/app.js";
import chalk from 'chalk';
import connectDB from "./src/config/db.js";

import dotenv from 'dotenv';
dotenv.config({});

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
    if (maxtries == 5) return;
    startServer();
})

function createServer() {
    server = http.createServer(app);
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

    connectDB().then(() => {
        server.listen(3002, () => {
            console.log('server started and listining on 3002')

            global.log = {
                success: (data) => console.log(chalk.green(data)),
                error: (data) => console.log(chalk.bgRed(data)),
                warn: (data) => console.log(chalk.yellow(data)),
                info: (data) => console.log(chalk.hex("#DEADED")(data)),
            }
        })
    });
}


startServer();
