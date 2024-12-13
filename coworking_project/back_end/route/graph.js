import express from 'express';
import { exec } from 'child_process';
import path from 'path';

const router = express.Router();

router.get('/user-repartition', (req, res) => {
    const graphPath = path.resolve(__dirname, 'C:/Users/gouja/coworking/public/images/user_repartition.jpg');
    res.sendFile(graphPath);
  });
  
export default router;
