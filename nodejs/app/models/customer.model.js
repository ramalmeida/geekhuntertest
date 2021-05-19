module.exports = (sequelize, Sequelize) => {
	const Customer = sequelize.define('customer', {	
	  id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },
	  firstname: {
			type: Sequelize.STRING
	  }
	});
	
	return Customer;
}
