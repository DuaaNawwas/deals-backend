import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { ClaimedDeal } from './claimed-deal.model';

@Table({
  tableName: 'Deals',
})
export class Deal extends Model<Deal> {
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

  @Column(DataType.STRING)
  Name!: string;

  @Column(DataType.TEXT)
  Description!: string;

  @Column(DataType.STRING)
  Status!: string;

  @Column(DataType.DECIMAL(10, 2))
  Amount!: number;

  @Column(DataType.STRING)
  Currency!: string;

  @HasMany(() => ClaimedDeal)
  claimedDeals!: ClaimedDeal[];
}
