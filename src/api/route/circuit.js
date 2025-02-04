import { createCircuit,getAllCircuits } from "../service/circuit/circuit.js";
import { Router } from "express";

export const circuitRoute = Router();

circuitRoute.post("/circuit", createCircuit);
circuitRoute.get("/circuits", getAllCircuits);