import express from express;
import { createCategory, getAllCategories } from "../controller/categoryController.js";

const routes = express.Router();

routes.post("/", createCategory);
routes.get("/", getAllCategories);


export default router;

