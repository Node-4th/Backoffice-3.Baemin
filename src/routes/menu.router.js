import express from 'express';
import { MenuRepository } from '../repositories/menu.repository.js';
import { MenuService } from '../services/menu.service.js';
import { MenuController } from '../controllers/menu.controller.js';
import { RestaurantRepository } from '../repositories/restaurant.repository.js';
import { RestaurantService } from '../services/restaurant.service.js';
import { dataSource } from '../typeorm/index.js';

const app = express();
const router = express.Router();
const restaurantRepository = new RestaurantRepository(dataSource);
const restaurantService = new RestaurantService(restaurantRepository);
const menuRepository = new MenuRepository(dataSource);
const menuService = new MenuService(menuRepository, restaurantService);
const menuController = new MenuController(menuService);

router.post('/', menuController.createMenu);
router.get('/:name', menuController.findAllMenu);
router.get('/:name', menuController.findMenu);
router.put('/', menuController.updateMenu);
router.delete('/', menuController.deleteMenu);

export default router;