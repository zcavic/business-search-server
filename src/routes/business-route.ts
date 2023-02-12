import { Express } from 'express';
import {
  getAllBusiness,
  getBusiness,
} from '../controllers/business-controller';

class BusinessRoutes {
  static setRoutes(app: Express) {
    app.get('/businesses', getAllBusiness);
    app.get('/businesses/:id', getBusiness);
  }
}

export { BusinessRoutes };
