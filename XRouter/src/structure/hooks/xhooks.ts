import { NextFunction, Request, Response } from "express";
import { HooksOptions } from "../../typings";

export abstract class XHooks {
  public async preHook(
    _req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    next();
  }

  public async postHook(
    _req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    next();
  }
}
