import { XRouter } from "../structure/router";
import express from 'express'
import path from 'path'
const app = express()

new XRouter({
    app,
    dir: path.join(__dirname, 'routes'),
    catchAllRoutes: path.join(__dirname, 'Routeset')

})
app.listen(3200, () => console.log("LAUNCHED DEMO"))