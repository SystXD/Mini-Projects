import { AsyncLocalStorage } from "async_hooks";
import { ContextOptions } from "../typings";
import { NextFunction, Request, Response } from "express";

export const ServerContext = new AsyncLocalStorage<ContextOptions>();
export function useRequest(): Request {
  const data = ServerContext.getStore() as ContextOptions;
  if (!data || !data.request)
    throw new Error(
      "[Error: XRouter] Request Hook can only be used inside handler"
    );
  return data.request;
}

export function useResponse(): Response {
  const data = ServerContext.getStore();
  if (!data || !data.response)
    throw new Error(
      "[Error: XRouter] Response Hook can only be used inside handler"
    );
  return data.response;
}
export function useNext(): NextFunction {
  const data = ServerContext.getStore();
  if (!data || !data.response)
    throw new Error(
      "[Error: XRouter] Response Hook can only be used inside handler"
    );
  return data.next;
}
