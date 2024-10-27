import {customer_array} from "../db/database.js";
import CustomerModel from "../model/customerModel.js";

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
const clearCustomerForm = () =>{
    $('#customerId').val("");
    $('#fullname').val("");
    $('#address').val("");
    $('#contact').val("");
}
const  validatemobile = (mobile) =>{
    const sriLankanMobileRegex = /^(?:\+94|0)?7[0-9]{8}$/;
    return sriLankanMobileRegex.test(mobile)
}
let selected_customer_index = null;

$("#customerSaveButton").on("click",function (){
    console.log("click customer save btn");
    let customer_id = $('#customerId').val();
    let fullname = $('#fullname').val();
    let address = $('#address').val();
    let contact = $('#contact').val();

    if (customer_id.length===0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Customer-Id!",
        });
    }else if(fullname.length===0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Name!",
        });
    }else if (address.length===0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Address!",
        });
    }else if (!validatemobile(contact)){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Contact!",
        });
    }else{
        console.log("customerId" , customer_id);
        console.log("fullname" , fullname);
        console.log("address" , address);
        console.log("contact" , contact);

        let customer = new CustomerModel(
            customer_array.length+1,
            customer_id,
            fullname,
            address,
            contact);


        customer_array.push(customer);
        Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Customer Save Successful",
            showConfirmButton: false,
            timer: 1500
        });
        clearCustomerForm();
        loadCustomerTable();
    }
});
