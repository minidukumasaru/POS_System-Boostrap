let customer_array = [];

const loadCustomerTable = () =>{
    $("#customerTableBody").empty();
    customer_array.map((cus_object,index) =>{
        console.log(cus_object);
        let data=`<tr>
            <td>${cus_object.customer_id}</td
            ><td>${cus_object.fullname}</td>
            <td>${cus_object.address}</td>
            <td>${cus_object.contact}</td>
            </tr>`
        $("#customerTableBody").append(data);
    })
}

$("#customerSaveButton").on("click",function (){
    console.log("click customer save btn");
    let customer_id = $('#customerId').val();
    let fullname = $('#fullname').val();
    let address = $('#address').val();
    let contact = $('#contact').val();

    console.log("customerId" , customer_id);
    console.log("fullname" , fullname);
    console.log("address" , address);
    console.log("contact" , contact);

    let customer = {
        id:customer_array.length+1,
        customer_id: customer_id,
        fullname: fullname,
        address:address,
        contact:contact,
    };

    customer_array.push(customer);
    loadCustomerTable();
});
