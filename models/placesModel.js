
module.exports = (sequelize, DataTypes) => {
    const Places = sequelize.define('places', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        uniqueId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true
        },
        city: {
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