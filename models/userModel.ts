import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../config/database";

// Define a class that extends the Sequelize Model class
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare password: string;
}

// Initialize the User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: "users",
    sequelize, // passing the `sequelize` instance is required
  },
);

export default User;

// public id!: number;
// will cause issue with when compile to js

// if we use multiple access modifiers in the class, better to use public with declare.
// private, public confusion will be there, to avoid use declare public id: number;

/*
* Old version
* import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from "../config/database";

// Define an interface for the User attributes
interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
}

// Define an interface for User creation attributes (optional id)
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

// Define a class that extends the Sequelize Model class
class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
{
    declare id: number;
    declare name: string;
    declare email: string;
    declare password: string;
}

// Initialize the User model
User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false,
        }
    },
    {
        tableName: "users",
        sequelize // passing the `sequelize` instance is required

    }
)
* */
