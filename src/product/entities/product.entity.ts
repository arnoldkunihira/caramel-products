import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ name: "name", type: "varchar", length: 100 })
    name: string;

    @Column({ name: "price", type: "decimal" })
    price: number;

    @Column({ name: "stock", type: "integer" })
    stock: number;

    @Column({ name: "condition", type: "varchar", length: 50 })
    condition: string;

    @Column({ name: "description", type: "varchar", length: 255 })
    description: string;

    @CreateDateColumn({ name: "created_at", type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}
