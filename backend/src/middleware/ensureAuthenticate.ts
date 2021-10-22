import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

// Realizar validação para verificar se o token é válido
interface IPayload {
  sub: string;
}

export function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      errorCode: "token.invalid",
    });
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload;
    request.userId = sub;
    return next();
  } catch (error) {
    return response.status(401).json({ errorCode: "token.expired" });
  }
}
