import express from "express";
import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const authorizationClient = req.headers["authorization"];
  const token = authorizationClient && authorizationClient.split(" ")[1];

  if (!token) return res.sendStatus(401);

  try {
    const user = jwt.verify(token, process.env.ACCESS_JWT_SECRET);
    req.user = user;
    next();
  } catch (e) {
    return res.sendStatus(403);
  }
}
