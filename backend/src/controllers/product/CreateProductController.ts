import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController {

    async handle(req: Request, res: Response) {
        const { name, description, price, category_id } = req.body;
        let banner = '';

        const createProductService = new CreateProductService();


        const product = await createProductService.execute({
            name,
            description,
            price,
            banner,
            category_id
        });

        return res.json(product);

    }
}

export { CreateProductController }