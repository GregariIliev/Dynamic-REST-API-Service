import { Actor } from '../model/Actor.js'
import { Op } from 'sequelize'

async function getAll(query) {
    const newQuery = {}

    for (const key in query) {
        newQuery[key] = {
            [Op[Object.keys(query[key])]]: Object.values(query[key])[0]
        }
    }
    
    return await Actor.findAll({
        where: newQuery
    });
}

async function getById(id) {
    return await Actor.findByPk(id);
}

async function create(actor) {
    return await Actor.create(actor);
}

async function remove(id) {
    return await Actor.destroy({ where: { actorId: id } });
}

async function update(actor, id) {
    console.log(actor);
    return await Actor.update(actor, { where: { actorId: id } });
}

export {
    getAll,
    getById,
    create,
    remove,
    update
}