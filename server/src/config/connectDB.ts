import db from "./db";
//models
import { Category, Equipment } from '../Models/index'
//data
import { categoriesData, equipmentData } from './Data/index'

export const connectDB = async () => {

    db.authenticate()
        .then(() => {
            console.log('Conexion a la base de datos exitosa 🟢');
        })
        .catch((error: any) => {
            throw new Error(error);
        });

    await db.sync({ force: true }).then(() => {
        console.log('Tablas sincronizadas');
    }).catch((error: any) => {
        console.log('Error al sincronizar tablas: ', error);
    });

    // Cargar los datos en la BD
    try {
        await InsertData();
        console.log('Datos insertados correctamente')
    } catch (error) {
        console.log('Error al insertar los datos: ', error)
    }
}

const InsertData = async () => {
    db.sync().then(
        async () => {
            //insertar las categorias
            const categories = await Category.count();

            if (categories === 0) {
                Promise.all(categoriesData.map(async (category) => {
                    await Category.create(category);
                }));
            };
            //insertar los equipos
            const equipments = await Equipment.count();

            if (equipments === 0) {
                Promise.all(
                    equipmentData.map( async (equipment) => {
                        const category = await Category.findOne({
                            where: { name: equipment.categoryName },
                        });
                        await Equipment.create({...equipment, categoryId: category?.id});
                    })
                )
            }

        }
    )
}
