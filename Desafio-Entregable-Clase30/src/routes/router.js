import express from "express";
import { fork } from "child_process";

export const router = express.Router();


router.get('/', (req, res) => {
    const qty = req.query.qty || 100000000;

    const forked = fork("./src/child.js");
    forked.send(qty);
    
    forked.on("message", (message) => {
        res.json(message);
    });
});






