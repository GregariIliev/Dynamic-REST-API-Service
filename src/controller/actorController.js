import dotenv from 'dotenv';
dotenv.config();

import { csvConverter } from '../utility/csvConverter.js';
import { validateToken } from '../utility/validationToken.js';

import * as actorService from '../service/actorService.js';

async function download(req, res) {
    try {
        const valid = validateToken(req);

        if (!valid) {
            throw new Error('Invalid token!');
        }

        const actors = await actorService.getAll(req.query);

        if (!actors) {
            throw new Error('Actors table are empty!');
        }

        const csv = csvConverter(actors);

        res.header('Content-Type', 'text/csv');
        res.header("Content-Disposition", "attachment; filename=actors.csv");

        res.send(csv);

    } catch (error) {
        res.status(404).json(error);
    }
}

async function getAll(req, res) {
    try {

        const actors = await actorService.getAll(req.query);

        if (!actors) {
            throw new Error('Actors table are empty!');
        }

        res.status(200).json(actors);


    } catch (error) {
        // if(error.name === "SequelizeDatabaseError" && error.parent.routine === "errorMissingColumn"){
        //     res.status(404).json("errorMissingColumn")
        // }
        res.status(404).json(error);
    }
}

async function getById(req, res) {
    try {
        const id = req.params.id;
        const actor = await actorService.getById(id);

        if (!actor) {
            throw new Error('Actor not exist!');
        }

        res.status(200).json(actor);

    } catch (error) {
        res.status(404).json(error);
    }
}

async function create(req, res) {
    try {
        const valid = validateToken(req);

        if (!valid) {
            throw new Error('Invalid token!');
        }

        const body = req.body;

        if (!body) {
            throw new Error('Body is empty!');
        }


        const actor = await actorService.create(body);

        res.status(201).json(actor);

    } catch (error) {
        res.status(401).json(error);
    }
}

async function remove(req, res) {
    try {
        const valid = validateToken(req);

        if (!valid) {
            throw new Error('Invalid token!');
        }

        const id = req.params.id;

        const isRemoved = await actorService.remove(id);

        if (!isRemoved) {
            throw new Error('Fail to remove this item!');
        }

        res.status(200).json(isRemoved);

    } catch (error) {
        res.status(404).json(error);
    }
}

async function update(req, res) {
    try {
        const valid = validateToken(req);

        if (!valid) {
            throw new Error('Invalid token!');
        }
        
        const body = req.body;
        const id = req.params.id;

        const actor = await actorService.update(body, id);

        if (!actor) {
            throw new Error('Update filed!');
        }

        res.status(202).json(actor);

    } catch (error) {
        res.status(204).json(actor);
    }
}

export {
    getAll,
    getById,
    create,
    remove,
    update,
    download
}