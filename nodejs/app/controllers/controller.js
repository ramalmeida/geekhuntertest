const db = require('../config/db.config.js');
const Customer = db.Customer;

/**
 * Save a Customer object to database MySQL
 * @param {*} req 
 * @param {*} res 
 */
exports.createCustomer = (req, res) => {
    let customer = {};

    try{
        customer.firstname = req.body.firstname;
        Customer.create(customer, 
                          {attributes: ['id', 'firstname']})
                    .then(result => {    
                      res.status(200).json(result);
                    });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

/**
 * Retrieve Customer information from database
 * @param {*} req 
 * @param {*} res 
 */
exports.customers = (req, res) => {
    try{
        Customer.findAll({attributes: ['id', 'firstname']})
        .then(customers => {
            res.status(200).json(customers);
        })
    }catch(error) {
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    }
}

exports.getCustomer = (req, res) => {
    Customer.findByPk(req.params.id, 
                        {attributes: ['id', 'firstname']})
        .then(customer => {
          res.status(200).json(customer);
        }).catch(error => {
          // log on console
          console.log(error);

          res.status(500).json({
              message: "Error!",
              error: error
          });
        })
}

/**
 * Updating a Customer
 * @param {*} req 
 * @param {*} res 
 */
exports.updateCustomer = async (req, res) => {
    try{
        let customer = await Customer.findByPk(req.body.id);
    
        if(!customer){
            res.status(404).json({
                message: "nao foi localizado customer com este id = " + customerId,
                error: "404"
            });
        } else {
            let updatedObject = {
                firstname: req.body.firstname
            }
            let result = await Customer.update(updatedObject,
                              { 
                                returning: true, 
                                where: {id: req.body.id},
                                attributes: ['id', 'firstname']
                              }
                            );
            if(!result) {
                res.status(500).json({
                    message: "Error ao pode atualizar customer com este id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json(result);
        }
    } catch(error){
        res.status(500).json({
            message: "Error nao pode atualizar customer com este id = " + req.params.id,
            error: error.message
        });
    }
}

/**
 *  Delete a Customer by ID
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteCustomer = async (req, res) => {
    try{
        let customer = await Customer.findByPk(req.params.id);
        if(customer == '' ){
            res.status(404).json({
                message: "nao existe customer com este id = " + customerId,
                error: "404",
            });
        } else {
            await customer.destroy();
            res.status(200).json(customer);
            
        }
    } catch(error) {
        res.status(500).json({
            message: "Error nao pode deletar customer com este id = " + req.params.id,
            error: error.message
        });
    }
}