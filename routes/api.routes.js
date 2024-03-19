import {Router} from 'express';
import { register_doctor, register_user, login, get_profile, get_all_rooms, get_all_message_in_room, search_messages, update_profile } from './../controllers/user.controller.js';
const router = Router();

router.get('/profile/:userId', get_profile)

router.get('/rooms/:userId', get_all_rooms);

router.get('/rooms/:roomId/messages', get_all_message_in_room);

router.get('/search', search_messages);

router.post('/register/doctor', register_doctor);

router.post('/register/user', register_user);

router.post('/login', login);

router.post('/ai/message');

router.patch('/profile/:userId', update_profile);

export default router;