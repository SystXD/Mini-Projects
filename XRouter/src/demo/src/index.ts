import express, { Router, Application } from 'express'
import { XRouter } from 'xantrack-router';
import path from 'path'
const app = express() 

new XRouter(
    {
        dir: path.join(__dirname, 'routes'),
        catchAllRoutes: path.join(__dirname, 'routest'),
        hooks: true,
        app,
    }


)

app.listen(2300, () => console.log("GO on"))