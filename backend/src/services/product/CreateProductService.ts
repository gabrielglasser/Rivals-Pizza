import prismaClient from "../../prisma";

interface ProductRequest {
    name: string;
    description: string;
    price: string;
    banner: string;
    category_id: string;
}

class CreateProductService {
    async execute({ name, description, price, banner, category_id }: ProductRequest){

        const product = await prismaClient.product.create({
            data: {
                name: name,
                price: price,
                description: description,
                banner: banner,
                category_id: category_id
            }
        });

        return product;

    }
}

export { CreateProductService };