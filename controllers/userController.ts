import { Request, Response } from "express";
import User from "../models/userModel";
import { where } from "sequelize";
import Joi from "joi";

// Define validation schema for the user creation data
const userSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const updateUserSchema = Joi.object({
  name: Joi.string().trim().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
});

const idSchema = Joi.object({
  id: Joi.number().required(),
});

export const createUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // 1. Validate the incoming request body against the schema
    const { error, value } = userSchema.validate(req.body);

    if (error) {
      // 2. If validation fails, return a 400 Bad Request with the error details
      res.status(400).json({ message: error.details[0].message });
      return; // Return to prevent further execution
    }

    // `value` is the clean, validated data.
    // We can directly pass it to `User.create`.
    const user = await User.create(value);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error, value } = idSchema.validate(req.params);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const { id } = value;

    const user = await User.findByPk(id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  try {
    const { error: paramError, value: paramValue } = idSchema.validate(
      req.params,
    );

    if (paramError) {
      res.status(400).json({ message: paramError.details[0].message });
      return;
    }

    const { error: bodyError, value: bodyValue } = updateUserSchema.validate(
      req.body,
    );

    if (bodyError) {
      res.status(400).json({ message: bodyError.details[0].message });
      return;
    }

    const { id } = paramValue;
    const [updated] = await User.update(bodyValue, { where: { id: id } });
    // if we don't destructure, updated = [1] or [0] will return truthy. this will be a bug
    if (updated) {
      const updatedUser = await User.findByPk(id);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { error } = idSchema.validate(req.params);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
    }

    // Defense Programming: Ensure id is a number, even after it will be converted by Sequelize
    const id = parseInt(req.params.id);

    const deleted = await User.destroy({ where: { id: id } });
    if (deleted) res.status(200).json({ message: "User deleted successfully" });
    else res.status(404).json({ message: "User not found" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
