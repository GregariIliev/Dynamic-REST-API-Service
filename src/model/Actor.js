import { db } from '../config/db.js';

const Actor = db.sequelize.define('actor', {
    actorId: {
        type: db.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'actor_id'
    },
    firstName: {
        type: db.DataTypes.STRING,
        field: 'first_name'
    },
    lastName: {
        type: db.DataTypes.STRING,
        field: 'last_name'
    }
}, {
    tableName: 'actor',
    schema: 'mystore',
    timestamps: false
});

export { Actor }