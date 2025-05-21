import express from 'express';
import { getFormData } from '../controllers/getFormData.controller.js';
export const route = express();

route.get('/data', getFormData);