//temporary space for storing customer's connection
var customers = [];
// var customer = { connection_id, cs_name, customer_room };
//debug line


//let cs can freely join any customer room
let addCustomer = ({ connection_id, customer_room }) => {

  let customer = { connection_id: connection_id, username: customer_room, customer_room: customer_room, cs_flag: "no"};

  customers.push(customer);

  return customer;
}

let quitCustomer = (connection_id) => {
  let index = customers.findIndex((customer) => customer.connecton_id === connection_id);

  if(index !== -1) 
    //if found in temporary list, starting from index, deleting one element
    //return the first element in array after remove
    return customers.splice(index, 1)[0];
}

let infoCustomer = (connection_id) => {customers.find((customer) => customer.connection_id === connection_id)};

// var addcs = ({cs_name, customer_room}) => {
//   var index = customers.findIndex((customer) => customer.customer_room === customer_room);
//   if(index !== -1) {
//     customers[index].cs_name = cs_name;
//     return customers[index];
//   }
// };

let addcs = ({connection_id, cs_name, customer_room}) => {
  let customer = { connection_id: connection_id, username: cs_name, customer_room: customer_room, cs_flag: "yes"};

  customers.push(customer);

  return customer;
};

// var updatecs = ({cs_name, customer_room}) => {
//   var index = customers.findIndex((customer) => {customer.customer_room === customer_room
    
//   });
//   if(index !== -1) {
//     customers[index].cs_name = cs_name;
//     return customers[index];
//   }
// };


let findemptyroom = customers.filter((item, index, array)=>{return (item.cs_flag==="no")})

module.exports = { addCustomer, quitCustomer, infoCustomer, addcs, findemptyroom};