import prismaClient from "../../prisma";

interface OrderRequest {
  order_id: string;
  product_id: string;
  amount: number;
}
class AddItemService {
  async execute({ order_id, product_id, amount }: OrderRequest) {
    const item = await prismaClient.item.create({
      data: {
        order_id: order_id,
        product_id: product_id,
        amout: amount,
      },
    });

    return item;
  }
}

export { AddItemService };
