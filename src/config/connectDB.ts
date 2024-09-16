import db from "./db";

export const connectDB = async () => {

    db.authenticate()
        .then(() => {
            console.log('Conexion a la base de datos exitosa 🟢');
        })
        .catch((error:any) => {
            throw new Error(error);
        });
}