import { Request, Response, Router } from 'express';
import { Limit } from '../database/repository';
import { Mail } from '../services/mail.service';
import { Alerts } from '../services/alerts.services';

const router = Router();

router.post('/limits/set', async (req: Request, res: Response) => {
    const data = req.body;
    if(!data.name) {
        res.status(400);
        res.send();
        return;
    }
    const limits = {
        upperLimit: data.upperLimit,
        inferiorLimit: data.inferiorLimit,
    }
    if(!limits.upperLimit || limits.upperLimit === '') delete limits.upperLimit;
    if(!limits.inferiorLimit || limits.inferiorLimit === '') delete limits.inferiorLimit;
    const response = await Limit.setLimit(limits, data.name);
    await Alerts.getLimits();
    res.json(response);
});

router.post('/email/register', async (req: Request, res: Response) => {
    const email = req.body.email;
    await Mail.register(email);
    res.status(200);
    res.send();
});

export default router;
