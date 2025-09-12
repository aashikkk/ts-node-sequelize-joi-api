import { Request, Response } from "express";
import User from "../models/userModel";
import { where } from "sequelize";

export const createUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
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
  const { id } = req.params;

  try {
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
    const [updated] = await User.update(req.body, { where: { id: id } });
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
  const { id } = req.params;

  try {
    const deleted = await User.destroy({ where: { id: id } });
    if (deleted) res.status(200).json({ message: "User deleted successfully" });
    else res.status(404).json({ message: "User not found" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
