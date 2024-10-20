import { Category } from "../Models";

type ICategory = {
    name: string;
    description: string,
}

class CategoryServices {

    constructor() { }

    async findAllCategories() {
        return await Category.findAll();
    }

    // async findOneCategory(id: string) {
    //     return await Category.findByPk(id);
    // }

    // async createCategory(params: ICategory) {
    //     return await Category.create(params);
    // }

    // async updateCategory(id: string, params: ICategory) {
    //     return await Category.update(params, { where: { id } });
    // }

    // async deleteCategory(id: string) {
    //     return await Category.update({ state: false }, { where: { id } });
    // }

}

export default new CategoryServices();