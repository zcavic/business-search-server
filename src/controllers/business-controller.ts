import { Request, Response, NextFunction } from 'express';
import { get, getAll } from '../services/business-service';

async function getAllBusiness(req: Request, res: Response, next: NextFunction) {
  try {
    const business = await getAll(req.query.filter as string);
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000'); // code smell, configure cors in index.ts
    res.status(200).json({ status: 'Success', business });
  } catch (err) {
    next(err);
  }
}

async function getBusiness(req: Request, res: Response, next: NextFunction) {
  try {
    const business = await get(req.params.id);
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.status(200).json({ status: 'Success', business });
  } catch (err) {
    next(err);
  }
}

export { getAllBusiness, getBusiness };
