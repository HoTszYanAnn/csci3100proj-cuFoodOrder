//temporary space for storing customer's connection
var customers = [];
// var customer = { connection_id, cs_name, customer_room };

//let cs can freely join any customer room
var addCustomer = ({ connection_id, customer_room }) => {

  var customer = { connection_id, customer_room };

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

var addcs = ({cs_name, customer_room}) => {
  var index = customers.findIndex((customer) => customer.customer_room === customer_room);
  if(index !== -1) {
    customers[index].cs_name = cs_name;
    return customers[index];
  }
};

var findemptyroom = customers.filter((item, index, array)=>{
    return ((item.cs_name===undefined));
  })

module.exports = { addCustomer, quitCustomer, infoCustomer, addcs, findemptyroom};