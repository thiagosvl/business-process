import { Sequelize, Model, DataTypes, Optional } from 'sequelize';

export interface DepartmentAttributes {
    id: number;
    name: string;
}

export interface DepartmentCreationAttributes extends Optional<DepartmentAttributes, 'id'> {}

class Department extends Model<DepartmentAttributes, DepartmentCreationAttributes> {}

const initDepartment = (sequelize: Sequelize) => {
    Department.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'departments',
        sequelize
    });

    return Department;
};

export const associate = (models: any) => {
    Department.hasMany(models.Process, {
        foreignKey: 'departmentId',
        as: 'processes'
    });
}

export { initDepartment, Department };
