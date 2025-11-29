// import { verifyToken } from "../lib/jwt.ts";

import { verifyToken } from "../lib/jwt.ts";

// export const authInterceptor = async (ctx: any, next: any) => {
//   const auth = ctx.headers["authorization"];

//   if (!auth) throw new Error("Unauthorized");

//   const token = auth.split(" ")[1];
//   const payload = verifyToken(token);

//   ctx.user = payload;

//   return next();
// };
export const authInterceptor = async (ctx: any, next: () => Promise<any>) => {
  const authHeader = ctx.context?.headers?.authorization;
  if (!authHeader) throw new Error("Unauthorized");

  const token = authHeader.split(" ")[1];
  if (!token) throw new Error("Unauthorized");

  ctx.context.user = verifyToken(token);

  return await next();
};
