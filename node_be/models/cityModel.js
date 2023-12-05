
module.exports = (sequelize, DataTypes) => {
    const City = sequelize.define('cities', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
        
    })

    return City
}