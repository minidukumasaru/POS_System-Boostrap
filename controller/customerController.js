import {customer_array} from "../db/database.js";
import CustomerModel from "../model/customerModel.js";

const loadCustomerTable = () =>{
    $("#customerTableBody").empty();
    customer_array.map((cus_object,index) =>{
        let data=`<tr>
            <td>${cus_object.customer_id}</td>
            <td>${cus_object.fullname}</td>
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

// Customer Save
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

$('#customerTableBody').on('click','tr',function (){
    let index = $(this).index();
    selected_customer_index = index;

    let cus_object = customer_array[index];

    let customer_id = cus_object.customer_id;
    let fullname = cus_object.fullname;
    let address = cus_object.address;
    let contact = cus_object.contact;

    $('#customerId').val(customer_id);
    $('#fullname').val(fullname);
    $('#address').val(address);
    $('#contact').val(contact);
})

// Customer Delete
$('#customerUpdateButton').on('click',function (){

    Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
    })
    .then((result) =>{
        if(result.isConfirmed){
            let customer_id = $('#customerId').val();
            let fullname = $('#fullname').val();
            let address = $('#address').val();
            let contact = $('#contact').val();

            let index = selected_customer_index;

            let customer = new CustomerModel(
                customer_id,
                fullname,
                address,
                contact
            );
            customer_array[selected_customer_index] = customer;

            clearCustomerForm();
            loadCustomerTable();
            Swal.fire("Saved!", "", "success");
        }else if(result.isDenied){
            Swal.fire("Changes are not saved", "", "info");
        }
    });
})

// Customer Delete
$('#customerDeleteButton').on('click',function (){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            customer_array.splice(selected_customer_index, 1);

            clearCustomerForm()
            loadCustomerTable()
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
            });
        }
    });
})