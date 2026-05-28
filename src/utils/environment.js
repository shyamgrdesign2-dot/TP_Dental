export const PRODUCTION_ENVIRONMENTS = ["prod", "zy-preprod"];

export const isProductionEnv = (env = process.env.REACT_APP_ENV) =>
  PRODUCTION_ENVIRONMENTS.includes(env);
