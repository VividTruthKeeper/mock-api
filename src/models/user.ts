import { Table, Column, DataType, Model } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";

@Table({
  timestamps: false,
  tableName: "users",
})
export class User extends Model {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    unique: true,
    defaultValue: uuidv4(),
  })
  userId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING(64),
    allowNull: false,
  })
  hash!: string;
}
