import { db } from '../config/db.js';

async function validateRequest(req, res, next) {

    if (!req.params.schema) {
        res.status(404).json(new Error('Missing schema and table!'));
    }

    if (req.params.id) {
        const id = Number(req.params.id);

        if (typeof id !== 'number') {
            res.status(404).json(new Error('Invalid id!'));
        }
    }

    const [schema, table] = req.params.schema.split('-');
    
    // decodeURI(schema)
    // decodeURI(table)

    db.sequelize.showAllSchemas()
        .then(shemas => {
            const schemExist = shemas.includes(schema, 0);
            const tableExist = db.sequelize.isDefined(table);
            if (!schemExist || !tableExist) {
                res.status(404).json({ error: 'Schema or table not exist!' });
            }

            next();
        });
}

export { validateRequest }