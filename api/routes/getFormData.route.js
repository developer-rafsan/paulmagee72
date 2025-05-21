import express from 'express';
import { getFormData } from '../controllers/getFormData.controller.js';
export const formRoute = express();

formRoute.get('/formdata', getFormData);