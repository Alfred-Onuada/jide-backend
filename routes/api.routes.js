import { Router } from "express";
import {
  register_doctor,
  register_user,
  login,
  get_profile,
  get_all_rooms,
  get_all_message_in_room,
  search_messages,
  update_profile,
  get_ai_message,
  send_a_message,
  get_all_doctors
} from "./../controllers/user.controller.js";
const router = Router();

router.get("/profile/:userId", get_profile);

router.get("/rooms/:userId", get_all_rooms);

router.get("/rooms/:roomId/messages", get_all_message_in_room);

router.get("/search", search_messages);

router.get("/doctors", get_all_doctors);

router.post("/register/doctor", register_doctor);

router.post("/register/user", register_user);

router.post("/login", login);

router.post("/ai/message", get_ai_message);

router.post("/message", send_a_message);

router.patch("/profile/:userId", update_profile);

export default router;
