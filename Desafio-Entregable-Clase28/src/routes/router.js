import express from "express";
import { fork } from "child_process";

export const router = express.Router();
const forked = fork("./src/child.js");

    router.get('/', (req, res) => {
    forked.on('message', (result) => {
        res.send({result: result})
    })
})




