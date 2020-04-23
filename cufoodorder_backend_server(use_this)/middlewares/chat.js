//temporary space for storing customer's connection
let customers = [];
// var customer = { connection_id, cs_name, customer_room };
//debug line


//let cs can freely join any customer room
let addCustomer = ({ connection_id, customer_room }) => {

  let customer = { connection_id: connection_id, username: customer_room, customer_room: customer_room, cs_flag: "no", need_flag:"yes"};

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

let infoCustomer = (connection_id) => customers.find((item, index, array) => {return item.connection_id === connection_id});

let infocs = (customer_room) => customers.find((item, index, array) => {return ((item.customer_room === customer_room)&&(item.cs_flag==="yes"))});
// var addcs = ({cs_name, customer_room}) => {
//   var index = customers.findIndex((customer) => customer.customer_room === customer_room);
//   if(index !== -1) {
//     customers[index].cs_name = cs_name;
//     return customers[index];
//   }
// };
let infocust = (customer_room) => {
  let index = customers.findIndex((customer) => {((customer.customer_room === customer_room)&&(customer.need_flag==="yes"))});
  if(index !== -1) {
    customers[index].need_flag = 'no';
    return customers[index];
}
};



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


let findemptyroom = customers.filter((item, index, array)=>{return ((item.cs_flag==="no")&&(item.need_flag==="yes"))})

// module.exports = { addCustomer, quitCustomer, infoCustomer, addcs, findemptyroom};

module.exports = { addCustomer, quitCustomer, infoCustomer, addcs, infocs, infocust,findemptyroom};