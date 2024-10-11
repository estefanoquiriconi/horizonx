module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            first_name: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            last_name: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true
            },
            avatar: {
                type: DataTypes.STRING(100),
                allowNull: false,
                defaultValue: 'default-avatar-image.png'
            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            role_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            registrationCode: {
                type: DataTypes.STRING(30),
                allowNull: true
            },
            recoverPassCode: {
                type: DataTypes.STRING(10),
                allowNull: true
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: DataTypes.NOW
            }
        },
        {
            tableName: 'users',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );

    User.associate = function (models) {
        User.belongsTo(models.Role, { 
            as: "role",
            foreignKey: "role_id"
        })
    }

    return User;
};
