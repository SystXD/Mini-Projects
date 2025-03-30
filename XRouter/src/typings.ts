import { Application, NextFunction, Request, Response } from "express"

export interface RouterOptions {
    /**
     * The path where all the routes are being created.
     */
    dir?: string    
    /**
     * Get access to Request & Response from XRouter Hooks.
     * @example
     * const { useRequest, useResponse } = require('xrouter')
     * module.exports = () => { 
     *    const [req, res] = [useRequest(), useResponse()]
     *    res
     *    .status(200)
     *    .json({ success: true })
     *  }
     */
    hooks?: boolean
    /**
     * The Base App Object.
     * For more information, see {@link https://expressjs.com/en/api.html#app Express Application}.
     */
    app:Application

    /**
     * The path for a single Route which accepts all HTTP Methods
     */
    catchAllRoutes?: string
}


export interface MethodInfo {
  method: string
  path: string
}
export interface ContextOptions {
    request:Request;
    response:Response
    next: NextFunction
}

export interface FileInfo {
   filePath: string
   folderName: string
   isFolder: boolean
}

export interface HooksOptions {
   request: Request;
   response: Response,
   next: NextFunction
}

export type HttpMethod = "get" | "post" | "put" | "patch" | "delete";
