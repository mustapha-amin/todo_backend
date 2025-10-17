import type { Request, Response } from "express";

function logger(req:Request, res:Response, next: Function) {
  console.log(`${req.method} ${req.url} at ${Date.now()}`);
  next(); 
}

export default logger 