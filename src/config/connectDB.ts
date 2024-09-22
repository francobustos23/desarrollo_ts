import db from "./db";

// const TableNames = ['users', 'movements', 'equipments', 'categories'];
export const connectDB = async () => {

    db.authenticate()
        .then(() => {
            console.log('Conexion a la base de datos exitosa 🟢');
        })
        .catch((error: any) => {
            throw new Error(error);
        });

    // for( const tNames of TableNames){
    //     try {
    //         await db.query(`DROP TABLE IF EXISTS ${tNames}`);
    //         console.log(`Tabla ${tNames} eliminada`);
    //     } catch (error) {
    //         console.log(`Error al eliminar tabla ${tNames}: `, error);
    //     }
    // }

    await db.sync({ force: true }).then(() => {
        console.log('Tablas sincronizadas');
    }).catch((error: any) => {
        console.log('Error al sincronizar tablas: ', error);
    });
}
