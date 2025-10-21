import { type Request, type Response } from "express";

export function notFoundHandler(_: Request, res: Response) {
  res.status(404).json({
    message: "Route not found",
  });
}
