import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { User } from './user.model';
import { Deal } from './deal.model';

@Table({
  tableName: 'ClaimedDeals',
})
export class ClaimedDeal extends Model<ClaimedDeal> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  ID!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  User_ID!: number;

  @ForeignKey(() => Deal)
  @Column(DataType.INTEGER)
  Deal_ID!: number;

  @Column(DataType.DATE)
  Server_DateTime!: Date;

  @Column(DataType.DATE)
  DateTime_UTC!: Date;

  @Column(DataType.DECIMAL(10, 2))
  Amount!: number;

  @Column(DataType.STRING)
  Currency!: string;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Deal)
  deal!: Deal;
}
