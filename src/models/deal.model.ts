// @/models.ts
import { Table, Column, Model, DataType, HasMany, CreatedAt, UpdatedAt } from "sequelize-typescript";
import ClaimedDeal  from "./claimed-deal.model";

@Table({
  tableName: "Deals",

})
export default class Deal extends Model<Deal> {
//   @Column({
//     primaryKey: true,
//     autoIncrement: true,
//     allowNull: false,
//   })
//   ID!: number;

  @Column({ type: DataType.DATE })
  Server_DateTime!: Date;

  @CreatedAt
  DateTime_UTC!: Date;

  @UpdatedAt
  Update_DateTime_UTC!: Date;

  @Column({ type: DataType.STRING })
  Name!: string;

  @Column({ type: DataType.TEXT })
  Description!: string;

  @Column({ type: DataType.STRING })
  Status!: string;

  @Column({ type: DataType.DECIMAL(10, 2) })
  Amount!: number;

  @Column({ type: DataType.STRING })
  Currency!: string;

  @HasMany(() => ClaimedDeal)
  claimedDeals!: ClaimedDeal[];
}
