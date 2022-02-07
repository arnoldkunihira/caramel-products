import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private readonly repository: Repository<Product>) {}

    create(createProductDto: CreateProductDto): Promise<Product> {
        const product = this.repository.create(createProductDto);
        return this.repository.save(product);
    }

    findAll(): Promise<Product[]> {
        return this.repository.find();
    }

    async findOne(id: number): Promise<Product> {
        const product = await this.repository.findOne(id);
        if (!product) {
            throw new NotFoundException(`Product with id ${id} not found.`);
        }
        return product;
    }

    async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
        const product = await this.repository.preload({ id: id, ...updateProductDto });
        if (!product) {
            throw new NotFoundException(`Product with id ${id} not found.`);
        }
        return this.repository.save(product);
    }

    async remove(id: number): Promise<Product> {
        const product = await this.findOne(id);
        return this.repository.remove(product);
    }
}
