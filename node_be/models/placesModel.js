
module.exports = (sequelize, DataTypes) => {
    const Places = sequelize.define('places', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        categoryId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cityId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true
        },
        searchedTimes: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        postedBy: {
            type: DataTypes.STRING,
            allowNull: true
        }
        
    })

    return Places
}