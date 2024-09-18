import db from "./db";

export const connectDB = async () => {

    db.authenticate()
        .then(() => {
            console.log('Conexion a la base de datos exitosa 🟢');
        })
        .catch((error: any) => {
            throw new Error(error);
        });
}

export const syncDB = async () => {
    await db.drop().then(() => {
        console.log('database drop');
    }).catch((error) => {
        console.error('error drop database:', error);
    });
    await db.sync({ force: false }).then(() => {
        ('database sync');
    }).catch((error) => {
        console.error('error sync database:', error);
    });
}