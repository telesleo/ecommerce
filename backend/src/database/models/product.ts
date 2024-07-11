import sequelize from 'sequelize';
import db from '.';
import { Model } from 'sequelize';

export class Product extends Model {
  public id?: string;
  public name!: string;
  public price!: number;
  public imageUrl!: string;
}

Product.init(
  {
    id: {
      type: sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: sequelize.UUIDV4,
    },
    name: {
      type: sequelize.CHAR(255),
      allowNull: false,
    },
    imageUrl: {
      type: sequelize.CHAR(2048),
      allowNull: false,
    },
    createdAt: {
      type: sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: sequelize.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'products',
    underscored: true,
    timestamps: true,
  },
);

export default Product;
