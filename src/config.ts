import Joi from "joi";

import { loadConfig } from "./util/load-config";

export interface Env {
  NODE_ENV: string;
  PORT: number;
  JWT_SECRET: string;
  ADMIN_STATUS: string;
  GUEST_STATUS: string;
  AUTH_SERVICE: string;
  BLOG_SERVICE: string;
  CONTACT_SERVICE: string;
}

const schema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("development", "test", "production")
      .default("development"),
    PORT: Joi.number().port().default(3000),
    JWT_SECRET: Joi.string(),
    ADMIN_STATUS: Joi.string(),
    GUEST_STATUS: Joi.string(),
    AUTH_SERVICE: Joi.string(),
    BLOG_SERVICE: Joi.string(),
    CONTACT_SERVICE: Joi.string()
  })
  .unknown();

const env = loadConfig(schema);

export const config = {
  env: env.NODE_ENV,
  port: env.PORT,
  jwtSecret: env.JWT_SECRET,
  adminStatus: env.ADMIN_STATUS,
  guestStatus: env.GUEST_STATUS,
  authService: env.AUTH_SERVICE,
  blogService: env.BLOG_SERVICE,
  contactService: env.CONTACT_SERVICE
};
