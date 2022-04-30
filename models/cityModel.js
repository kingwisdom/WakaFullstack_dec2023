
module.exports = (sequelize, DataTypes) => {
    const City = sequelize.define('cities', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
    })

    return City
}