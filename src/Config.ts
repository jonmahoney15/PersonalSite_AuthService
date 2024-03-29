import Joi from "joi";

import { loadConfig } from "./Util/Load-Config";

export interface Env {
  NODE_ENV: "development" | "test" | "production";
  PORT_NUM: number;
  MONGO_DB_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: number;
  ADMIN_STATUS: string;
  GUEST_STATUS: string;
}

const schema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("development", "test", "production")
      .default("development"),
    PORT_NUM: Joi.number().port().default(3000),
    MONGO_DB_URI: Joi.string(),
    JWT_SECRET: Joi.string(),
    JWT_EXPIRES_IN: Joi.number().default(0),
    ADMIN_STATUS: Joi.string(),
    GUEST_STATUS: Joi.string(),
  })
  .unknown();

const env = loadConfig(schema);

export const config = {
  env: env.NODE_ENV,
  port: env.PORT_NUM,
  mongoDbUri: env.MONGO_DB_URI,
  jwtSecret: env.JWT_SECRET,
  jwtExpiresIn: env.JWT_EXPIRES_IN,
  adminStatus: env.ADMIN_STATUS,
  guestStatus: env.GUEST_STATUS
};
