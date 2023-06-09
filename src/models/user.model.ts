import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { ClaimedDeal } from './claimed-deal.model';

@Table({
  tableName: 'Users',
})
export class User extends Model<User> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  ID!: number;

  @Column(DataType.DATE)
  Server_DateTime!: Date;

  @Column(DataType.DATE)
  DateTime_UTC!: Date;

  @Column(DataType.DATE)
  Update_DateTime_UTC!: Date;

  @Column(DataType.DATE)
  Last_Login_DateTime_UTC!: Date;

  @Column(DataType.STRING)
  Name!: string;

  @Column(DataType.STRING)
  Email!: string;

  @Column(DataType.STRING)
  Phone!: string;

  @Column(DataType.STRING)
  Status!: string;

  @Column(DataType.STRING)
  Gender!: string;

  @Column(DataType.DATEONLY)
  Date_Of_Birth!: Date;

  @Column({
    type: DataType.ENUM('user', 'admin'),
    defaultValue: 'user',
  })
  Role!: 'user' | 'admin';

  @HasMany(() => ClaimedDeal)
  claimedDeals!: ClaimedDeal[];
}
