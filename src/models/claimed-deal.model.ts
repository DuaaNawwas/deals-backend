// @/models.ts
import { Table, Column, Model, DataType, BelongsTo, ForeignKey, CreatedAt } from 'sequelize-typescript';
import  User  from './user.model';
import Deal  from './deal.model';

@Table({
  tableName: 'ClaimedDeals',
})
export default class ClaimedDeal extends Model<ClaimedDeal> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  ID!: number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  User_ID!: number;

  @ForeignKey(() => Deal)
  @Column({type: DataType.INTEGER})
  Deal_ID!: number;

  @Column({type: DataType.DATE})
  Server_DateTime!: Date;

  @CreatedAt
  DateTime_UTC!: Date;

  @Column({type: DataType.DECIMAL(10, 2)})
  Amount!: number;

  @Column({type: DataType.STRING})
  Currency!: string;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Deal)
  deal!: Deal;
}
