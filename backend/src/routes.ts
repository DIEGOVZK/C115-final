import { Request, Response, Router } from 'express';
import { AccX, AccY, AccZ } from './database/acc';
import { GyroX, GyroY, GyroZ } from './database/gyro';

const router = Router();

router.post('/accx/limits/set', (req: Request, res: Response) => {
    const data = req.body;
    if(!data.upperLimit || data.upperLimit === '') delete data.upperLimit;
    if(!data.inferiorLimit || data.inferiorLimit === '') delete data.inferiorLimit;
    const response = AccX.setLimit(data);
    res.json(response);
});

router.post('/accy/limits/set', (req: Request, res: Response) => {
    const data = req.body;
    if(!data.upperLimit || data.upperLimit === '') delete data.upperLimit;
    if(!data.inferiorLimit || data.inferiorLimit === '') delete data.inferiorLimit;
    const response = AccY.setLimit(data);
    res.json(response);
});

router.post('/accz/limits/set', (req: Request, res: Response) => {
    const data = req.body;
    if(!data.upperLimit || data.upperLimit === '') delete data.upperLimit;
    if(!data.inferiorLimit || data.inferiorLimit === '') delete data.inferiorLimit;
    const response = AccZ.setLimit(data);
    res.json(response);
});

router.post('/gyrox/limits/set', (req: Request, res: Response) => {
    const data = req.body;
    if(!data.upperLimit || data.upperLimit === '') delete data.upperLimit;
    if(!data.inferiorLimit || data.inferiorLimit === '') delete data.inferiorLimit;
    const response = GyroX.setLimit(data);
    res.json(response);
});

router.post('/gyroy/limits/set', (req: Request, res: Response) => {
    const data = req.body;
    if(!data.upperLimit || data.upperLimit === '') delete data.upperLimit;
    if(!data.inferiorLimit || data.inferiorLimit === '') delete data.inferiorLimit;
    const response = GyroY.setLimit(data);
    res.json(response);
});

router.post('/gyroz/limits/set', (req: Request, res: Response) => {
    const data = req.body;
    if(!data.upperLimit || data.upperLimit === '') delete data.upperLimit;
    if(!data.inferiorLimit || data.inferiorLimit === '') delete data.inferiorLimit;
    const response = GyroZ.setLimit(data);
    res.json(response);
});

export default router;
