//temporary space for storing customer's connection
var customers = [];

//let cs can freely join any customer room
var addCustomer = ({ connection_id, cs_name, customer_room }) => {

  var customer = { connection_id, cs_name, customer_room };

  customers.push(customer);

  return customer;
}

var quitCustomer = (connection_id) => {
  var index = customers.findIndex((customer) => customer.connecton_id === connection_id);

  if(index !== -1) 
    //if found in temporary list, starting from index, deleting one element
    //return the first element in array after remove
    return customers.splice(index, 1)[0];
}

var infoCustomer = (connection_id) => customers.find((customer) => customer.connection_id === connection_id);

module.exports = { addCustomer, quitCustomer, infoCustomer};