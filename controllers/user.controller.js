import express from "express";
const {Request, Response} = express;
import userModel from './../models/user.model.js';
import roomModel from './../models/room.model.js';
import messageModel from './../models/message.model.js';
import { compareSync } from "bcrypt";
import { isValidObjectId } from "mongoose";
import {handle_error} from './../utils/handle-error.js'

/**
 * @param {Request} req 
 * @param {Response} res 
 */
export async function register_doctor(req, res) {
  try {
    const insertInfo = await userModel.create({ ...req.body, role: 'doctor' });

    res.status(201).json({message: 'Registration Success', data: insertInfo});
  } catch (error) {
    handle_error(error, res);
  }
}

/**
 * @param {Request} req 
 * @param {Response} res 
 */
export async function register_user(req, res) {
  try {
    const insertInfo = await userModel.create({ ...req.body, role: 'patient' });

    res.status(201).json({message: 'Registration Success', data: insertInfo});
  } catch (error) {
    handle_error(error, res);
  }
}

/**
 * @param {Request} req 
 * @param {Response} res 
 */
export async function login(req, res) {
  try {
    const {email, password} = req.body;

    if (!email || !password) {
      res.status(401).json({message: 'Invalid credentials'});
      return;
    }

    const userInfo = await userModel.findOne({email});

    if (!userInfo) {
      res.status(401).json({message: 'Invalid credentials'});
      return;
    }

    const samePassword = compareSync(password, userInfo.password);

    if (!samePassword) {
      res.status(401).json({message: 'Invalid credentials'});
      return;
    }

    res.status(200).json({message: 'Login Successful', data: userInfo});
  } catch (error) {
    handle_error(error, res);
  }
}

/**
 * @param {Request} req 
 * @param {Response} res 
 */
export async function get_profile(req, res) {
  try {
    const {userId} = req.params;

    if (!isValidObjectId(userId)) {
      res.status(400).json({message: 'Invalid Request'});
      return;
    }

    const userInfo = await userModel.find({_id: userId});

    if (!userInfo) {
      res.status(404).json({message: 'User not found'});
      return;
    }

    res.status(200).json({message: "profile retrieved successfully", data: userInfo});
  } catch (error) {
    handle_error(error, res);
  }
}

/**
 * @param {Request} req 
 * @param {Response} res 
 */
export async function get_all_rooms(req, res) {
  try {
    const {userId} = req.params;

    if (!isValidObjectId(userId)) {
      res.status(400).json({message: 'Invalid Request'});
      return;
    }

    const rooms = await roomModel.find({participants: userId});

    if (rooms.length === 0) {
      res.status(404).json({message: 'You have not started a conversation yet'});
      return;
    }

    res.status(200).json({message: 'Rooms retrieved successfully', data: rooms});
  } catch (error) {
    handle_error(error, res);
  }
}

/**
 * @param {Request} req 
 * @param {Response} res 
 */
export async function get_all_message_in_room(req, res) {
  try {
    const {roomId} = req;

    if (!isValidObjectId(roomId)) {
      res.status(400).json({message: 'Invalid room ID'});
      return;
    }

    const messages = await messageModel.find({roomId});

    if (messages.length === 0) {
      res.status(404).json({message: 'No message in this room'});
      return;
    }

    res.status(200).json({message: 'Success', data: messages});
  } catch (error) {
    handle_error(error, res);
  }
}

/**
 * @param {Request} req 
 * @param {Response} res 
 */
export async function search_messages(req, res) {
  try {
    const {q: searchQuery} = req.query;

    const searchRegex = new RegExp(String.raw(`\Q${searchQuery}\E`));
    const messages = await messageModel.find({text: {$regex: searchRegex, $options: 'i'}});

    if (messages.length === 0) {
      res.status(404).json({message: 'No Message matched the search'});
      return;
    }

    res.status(200).json({message: 'Success', data: messages});
  } catch (error) {
    handle_error(error, res);
  }
}

/**
 * @param {Request} req 
 * @param {Response} res 
 */
export async function update_profile(req, res) {
  try {
    const {userId} = req.params;
    const update = req.body;

    if (!isValidObjectId(userId)) {
      res.status(400).json({message: 'Invalid Request'});
      return;
    }

    if (typeof update !== 'object') {
      res.status(400).json({message: 'Update can not be empty'});
      return;
    }

    const userInfo = await userModel.findOne({_id: userId});

    // TODO: confirm right fields are specified based on role
    const userRole = userInfo.role;
    const keysProvided = Object.keys(update);
    const doctorsFields = [];
    const patientFields = [];

    await userModel.updateOne({_id: userId}, update);

    res.status(204).json({message: 'Profile updated successfully'});
  } catch (error) {
    handle_error(error, res);
  }
}