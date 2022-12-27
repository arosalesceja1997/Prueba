import { Router } from "express";
import { controllerCompanie } from "../controllers";

const { getCompanies, createCompanie, updateCompanie, deleteCompanie } = controllerCompanie;

const routerCompanie = Router();
routerCompanie.get("/companies/:id?", getCompanies);
routerCompanie.post("/companies", createCompanie);
routerCompanie.put("/companies/:id", updateCompanie);
routerCompanie.delete("/companies/:id", deleteCompanie);

export { routerCompanie };
