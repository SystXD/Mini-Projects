import { XRouter } from "../structure/router";
import express from 'express'
import path from 'path'
const app = express()

new XRouter({
    app,
    catchAllRoutes: path.join(__dirname, 'Routeset'),
    hooks: true
})
app.listen(3200, () => console.log("LAUNCHED DEMO"))