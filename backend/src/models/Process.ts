import { Sequelize, Model, DataTypes } from 'sequelize';

export enum ProcessType {
    Manual = 'Manual',
    Systemic = 'Systemic',
    Automated = 'Automated'
}

export interface ProcessAttributes {
    id: number;
    name: string;
    parentId: number | null;
    type: ProcessType;
    departmentId: number;
}

export interface ProcessCreationAttributes extends ProcessAttributes {
    name: string;
    type: ProcessType;
    departmentId: number;
}

class Process extends Model<ProcessAttributes, ProcessCreationAttributes> { }

const initProcess = (sequelize: Sequelize) => {
    Process.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        parentId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        type: {
            type: DataTypes.ENUM,
            values: Object.values(ProcessType),
            allowNull: false
        },
        departmentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Departments',
                key: 'id'
            }
        }
    }, {
        tableName: 'processes',
        sequelize
    });

    return Process;
};

export const associate = (models: any) => {
    Process.belongsTo(models.Department, {
        foreignKey: 'departmentId',
        as: 'department'
    });
    Process.belongsTo(Process, { as: 'parentProcess', foreignKey: 'parentId' });
    Process.hasMany(Process, { as: 'subProcesses', foreignKey: 'parentId' });
}

export { initProcess, Process };
