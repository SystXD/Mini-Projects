import { Application, Request, Response, NextFunction } from "express";
import type { HttpMethod, RouterOptions } from "../typings";
import { getFiles, getMethods, pathToRoute } from "../utils/utils";
import path from "path";
import { ServerContext } from "../utils/constants";
import colors from "../utils/colors";
import { XHooks } from "./hooks/xhooks";

export class XRouter {
  public useHooks: boolean;
  public dir?: string;
  public catchAllRoutes?: string;
  private app: Application;

  constructor({ dir, app, hooks, catchAllRoutes }: RouterOptions) {
    this.useHooks = hooks ?? false;
    this.dir = dir;
    this.catchAllRoutes = catchAllRoutes;
    this.app = app;
    this.#buildRoutes();
  }

  #initHooks(): void {
    if (!this.dir)
      throw new Error("[Error: XRouter] The dir path is missing in class");

    let count = 0;
    try {
      for (const method of getMethods(this.dir)) {
        if (!this.#validateMethods(method.method.toLowerCase())) {
          console.warn(
            colors.yellow(
              `[Warn: XRouter] Unknown HTTP Method ${
                method.method
              } at ${path.basename(method.path)}`
            )
          );
          continue;
        }
        this.#registerRoute(
          method.method.toLowerCase() as HttpMethod,
          method.path,
          true
        );
        count++;
        console.log(
          colors.green(
            `Loaded ${count} ${method.method} ${count > 1 ? "Routes" : "Route"}`
          )
        );
      }
    } catch (error) {
      console.error(
        colors.red("[Error: XRouter] Error while initializing Routes"),
        error
      );
    }
  }

  #initRoutes(): void {
    if (!this.dir)
      throw new Error("[Error: XRouter] The dir path is missing in class");

    let count = 0;
    try {
      for (const method of getMethods(this.dir)) {
        if (!this.#validateMethods(method.method.toLowerCase())) {
          console.warn(
            colors.yellow(
              `[Warn: XRouter] Unknown HTTP Method ${
                method.method
              } at ${path.basename(method.path)}`
            )
          );
          continue;
        }
        this.#registerRoute(
          method.method.toLowerCase() as HttpMethod,
          method.path
        );
        count++;
        console.log(
          colors.green(
            `Loaded ${count} ${method.method} ${count > 1 ? "Routes" : "Route"}`
          )
        );
      }
    } catch (error) {
      console.error(
        colors.red("[Error: XRouter] Error while initializing Routes"),
        error
      );
    }
  }

  #registerRoute(
    method: HttpMethod,
    methodPath: string,
    hooks?: boolean
  ): void {
    if (!this.dir)
      throw new Error("[Error: XRouter] The dir path is missing in class");
    try {
      for (const info of getFiles(methodPath, true)) {
        const file = require(info.filePath);
        if (!file) {
          console.warn(
            `[Warn: XRouter]: ${path.basename(
              info.filePath,
              path.extname(info.filePath)
            )} is Missing to Export Handler`
          );
          continue;
        }

        const xhooks = Object.values(file).find((f) => f instanceof XHooks);
        const run = file.default;
        if (!run) {
          console.warn(
            `[Warn: XRouter]: ${path.basename(
              info.filePath,
              path.extname(info.filePath)
            )} is Missing to Export Handler`
          );
          continue;
        }

        const route = pathToRoute(
          info.filePath
            .substring(
              this.dir.indexOf(path.basename(this.dir)) +
                path.basename(this.dir).length
            )
            .replace(`${method.toUpperCase()}`, "/")
        );

        const middlewares = [
          ...(xhooks?.preHook ? [xhooks.preHook] : []),
          async (req: Request, res: Response, next: NextFunction) => {
            if (xhooks) {
              return Promise.resolve(
                ServerContext.run({ request: req, response: res, next }, run)
              ).then(() => xhooks.postHook?.(req, res, next));
            }
            run(req, res, next);
          },
        ];
        if (hooks) {
          this.app
            .route(route)
            [method](
              ...(xhooks?.preHook ? [xhooks.preHook] : []),
              (req, res, next) =>
                ServerContext.run(
                  { request: req, response: res, next: next },
                  run
                )
            );
        } else this.app.route(route)[method](...middlewares);
      }
    } catch (error) {
      console.error(
        colors.red("[Error: XRouter] Error while registering Routes"),
        error
      );
    }
  }

  #initAllRoutes(dir: string): void {
    if (!this.catchAllRoutes)
      throw new Error("[Error: XRouter] The dir path is missing in class");
    try {
      for (const files of getFiles(dir, true)) {
        const run = require(files.filePath);
        const route = pathToRoute(
          files.filePath.substring(
            dir.indexOf(path.basename(dir)) + path.basename(dir).length
          )
        );

        ["get", "post", "put", "patch", "delete"].forEach((m) => {
          if (run[m.toUpperCase()])
            this.#registerCatchAll(m as HttpMethod, route, run);
        });
      }
    } catch (error) {
      console.debug(
        colors.red("[Error: XRouter] Error while registering catch Routes"),
        error
      );
    }
  }

  #validateMethods(method: string): method is HttpMethod {
    return ["get", "post", "put", "patch", "delete"].includes(method);
  }

  #registerCatchAll(method: HttpMethod, route: string, file: any): void {
    this.app.route(route)[method](async (req, res, next) => {
      if (this.useHooks) {
        return ServerContext.run(
          { request: req, response: res, next },
          await file[method.toUpperCase()]
        );
      }
      file[method.toUpperCase()](req, res, next);
    });
  }

  #buildRoutes(): void {
    if (this.catchAllRoutes) this.#initAllRoutes(this.catchAllRoutes);
    if (this.useHooks && this.dir) this.#initHooks();
    else if (this.dir) this.#initRoutes();
  }
}
