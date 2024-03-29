import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";
import ClaimedDeal from "./claimed-deal.model";
import { BlobDataType } from "sequelize";

@Table({
  tableName: "Users",
})
export default class User extends Model<User> {
  //   @Column({
  //     primaryKey: true,
  //     autoIncrement: true,
  //     allowNull: false,
  //     type: DataType.INTEGER,
  //   })
  //   ID!: number;

  @Column({ type: DataType.DATE })
  Server_DateTime!: Date;

  @CreatedAt
  DateTime_UTC!: Date;

  @UpdatedAt
  Update_DateTime_UTC!: Date;

  @Column({ type: DataType.DATE })
  Last_Login_DateTime_UTC!: Date;

  @Column({ type: DataType.STRING, unique: true })
  Name!: string;

  @Column({ type: DataType.STRING, unique: true })
  Email!: string;

  @Column({ type: DataType.STRING })
  Password!: string;

  @Column({ type: DataType.STRING })
  Phone!: string;

  @Column({ type: DataType.STRING(1000) })
  Image!: string;

  @Column({ type: DataType.STRING, defaultValue: "Active" })
  Status!: string;

  @Column({ type: DataType.STRING })
  Gender!: string;

  @Column({ type: DataType.DATEONLY })
  Date_Of_Birth!: Date;

  @Column({
    type: DataType.ENUM("user", "Admin"),
    defaultValue: "user",
  })
  Role!: "user" | "Admin";

  @HasMany(() => ClaimedDeal)
  claimedDeals!: ClaimedDeal[];
}
