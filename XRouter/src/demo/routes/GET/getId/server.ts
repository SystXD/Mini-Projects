import { Request, Response, NextFunction, response } from "express";
import { XHooks } from "../../../../structure/hooks/xhooks";
import { useRequest, useResponse } from "../../../../utils/constants";

type IdRequest = Request & {
  id: string;
};
export class UtilHooks extends XHooks {
  public async preHook(
    req: IdRequest,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    req["id"] = crypto.randomUUID();
    next();
  }
}
export default function returnID() {
  const [req, res] = [useRequest(), useResponse()];

  return res.json({
    id: (req as IdRequest).id,
  });
}
