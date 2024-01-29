import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isAlpha: {
        msg: 'Name must only contain letters',
      },
      len: {
        args: [2, 250],
        msg: 'Name must be between 2 and 250 characters.',
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Invalid email format",
      },
      len: {
        args: [4, 250],
        msg: "Email must be between 8 and 250 characters.",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [8, 250],
        msg: "Password must be between 8 and 250 characters.",
      },
      RegExp(value: string) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number."
          );
        }
      },
    },
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      validateAge(value: number) {
        if (value !== null && (value < 18 || value > 99)) {
          throw new Error("Age must be between 18 and 99.");
        }
      },
    },
  },
});

export { User };
