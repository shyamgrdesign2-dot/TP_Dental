export const PRODUCTION_ENVIRONMENTS = ["prod", "zy-preprod"];
export const ZY_PREPROD_ENV = "zy-preprod";

export const isProductionEnv = (env = process.env.REACT_APP_ENV) =>
  PRODUCTION_ENVIRONMENTS.includes(env);

export const isZyPreprodEnv = (env = process.env.REACT_APP_ENV) =>
  env === ZY_PREPROD_ENV;
