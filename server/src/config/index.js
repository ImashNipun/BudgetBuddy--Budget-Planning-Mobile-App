import { Joi } from "celebrate";
import dotenv from "dotenv";

dotenv.config();

class envConfigBase {
  static get schema() {
    return {
      PORT: Joi.number().optional(),
      MONGODB_URI: Joi.string().required(),
      ACCESS_TOKEN_SECRET: Joi.string().required(),
      ACCESS_TOKEN_EXPIRY: Joi.string().required(),
    };
  }

  static get value() {
    return {
      PORT: process.env.PORT,
      MONGODB_URI: process.env.MONGODB_URI,
      ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
      ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
    };
  }
}

const config = envConfigBase.value;

const { error } = Joi.object(envConfigBase.schema).validate(config);

if (error) {
  console.error(
    `Enviorment validation failed. \nDetails -  ${error.details[0].message}\nExiting...`
  );

  process.exit(1);
}

export default config;