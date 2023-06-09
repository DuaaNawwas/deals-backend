
import { Table, Column, Model, DataType, HasMany, CreatedAt, UpdatedAt } from "sequelize-typescript";
import  ClaimedDeal  from "./claimed-deal.model";

@Table({
  tableName: "Users",
})
export default class User extends Model<User> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  ID!: number;

  @Column({ type: DataType.DATE })
  Server_DateTime!: Date;

  @CreatedAt
  DateTime_UTC!: Date;

  @UpdatedAt
  Update_DateTime_UTC!: Date;

  @Column({ type: DataType.DATE })
  Last_Login_DateTime_UTC!: Date;

  @Column({ type: DataType.STRING })
  Name!: string;

  @Column({ type: DataType.STRING })
  Email!: string;

  @Column({ type: DataType.STRING })
  Phone!: string;

  @Column({ type: DataType.STRING })
  Status!: string;

  @Column({ type: DataType.STRING })
  Gender!: string;

  @Column({ type: DataType.DATEONLY })
  Date_Of_Birth!: Date;

  @Column({
    type: DataType.ENUM("user", "admin"),
    defaultValue: "user",
  })
  Role!: "user" | "admin";

  @HasMany(() => ClaimedDeal)
  claimedDeals!: ClaimedDeal[];
}
