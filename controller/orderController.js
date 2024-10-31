import OrderModel from "../model/orderModel.js";
import {order_array} from "../db/database.js";

import CustomerModel from "../model/customerModel.js";
import {customer_array} from "../db/database.js";

import ItemModel from "../model/itemModel.js";
import {item_array} from "../db/database.js";

import orderItemModel from "../model/orderItemModel.js";
import {orderItem_array} from "../db/database.js";

import {orderDetails_array} from "../db/database.js";


const clearOrderForm = () =>{
    $('#orderID').val("");
    $('#date').val("");
    $('#orderCustomerID').val("");
    $('#customerName').val("");
    $('#customerAddress').val("");
    $('#orderItemID').val("");
    $('#orderItemName').val("");
    $('#orderItemPrice').val("");
    $('#itemQty').val("");
    $('#orderQty').val("");
    $('#totalAmount').text("");
    $('#cash').val("");
    $('#discount').val("");
    $('#balance').val("");
}
const clearAddItemForm = () =>{
    $('#orderItemID').val("");
    $('#orderItemName').val("");
    $('#orderItemPrice').val("");
    $('#itemQty').val("");
    $('#orderQty').val("");
}
const clearOrderItemTable = () => {
    $("#orderItemTableBody").empty();
};
const loadOrderItemTable = (orderId) => {
    $("#orderItemTableBody").empty();
    let filteredItems = orderItem_array.filter(item => item.orderId === orderId);

    filteredItems.forEach(orderItem_object => {
        let data = `<tr>
            <td>${orderItem_object.orderItemId}</td>
            <td>${orderItem_object.orderItemName}</td>
            <td>${orderItem_object.orderItemPrice}</td>
            <td>${orderItem_object.orderQty}</td>
            <td>${(orderItem_object.orderItemPrice * orderItem_object.orderQty).toFixed(2)}</td> 
        </tr>`
        $("#orderItemTableBody").append(data);
    });
};

$("#addItemButton").on('click', function() {
    let orderId =generateOrderId();
    let orderItemId =$('#orderItemID').val();
    let orderItemName = $('#orderItemName').val();
    let orderItemPrice = parseFloat($("#orderItemPrice").val()) ;
    let availableQty =  parseInt($('#itemQty').val());
    let orderQty = parseFloat($("#orderQty").val()) ;
    let total = orderItemPrice * orderQty;
    document.querySelector("#totalAmount").innerText = total.toFixed(2);


    if(orderQty > availableQty){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Not enough quantity!",
        });
    }else if(orderId.length===0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Order Id!",
        });
    }else if(orderItemId.length===0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Item Id!",
        });
    }else if(orderItemName.length===0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Item Name!",
        });
    }else if(isNaN(orderItemPrice) || orderItemPrice <= 0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Item Price!",
        });
    }else if(isNaN(availableQty) || availableQty <= 0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid  Available Qty!",
        });
    }else if(isNaN(orderQty) || orderQty <= 0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Order Qty!",
        });
    }else if(isNaN(total) || total <= 0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Total!",
        });
    }else {
        let orderItem = new orderItemModel(
            orderId,
            orderItemId,
            orderItemName,
            orderItemPrice,
            availableQty,
            orderQty,
            total
        );
        orderItem_array.push(orderItem);
        console.log(orderItem_array);
        loadOrderItemTable(orderId);
        updateItemArray();
        calculateOverallTotal(orderId);
    }
});


function calculateOverallTotal(orderId) {
    // Ensure orderId is a string for matching consistency
    orderId = String(orderId);

    // Filter items with the specified orderId and sum their _total values
    let orderTotal = orderItem_array
        .filter(item => item.orderId === orderId)
        .reduce((accumulator, item) => {
            return accumulator + (item._total || 0); // Make sure _total has a numeric value or default to 0
        }, 0);

    document.querySelector("#totalAmount").innerText = orderTotal.toFixed(2); // Display result with two decimal points
}

$(document).ready(function (){
    $("#orderID").val(generateOrderId());
})
let generateOrderId = function generateOrderId(){

    let id = order_array.length + 1;
    return "O00" + id;
}

let setOrderId = () => {
    $("#orderID").val(generateOrderId());
}
export function loadCustomers() {

    $("#orderCustomerID").empty();
    customer_array.map((item, number) => {

        let data = ` <option>${item._customer_id}</option>`

        console.log(data);
        $("#orderCustomerID").append(data);

    })
}
$("#orderCustomerID").on('input', function (){

    let id = $(this).val();
    let customerCode = customer_array.findIndex(item =>
        item._customer_id === id);

    if(customerCode !== -1 ){
        console.log(customerCode);
        $("#customerName").val(customer_array[customerCode].firstname);
        $("#customerAddress").val(customer_array[customerCode].address);


    }else{
        $("#customerName").val("");
        $("#customerAddress").val("");

    }

});


export function loadItems(){

    $("#orderItemID").empty();
    item_array.map((item,number) =>{

        let data = `<option>${item._itemId}</option>`

        console.log(data);
        $("#orderItemID").append(data);

    })
}
$("#orderItemID").on('input', function (){

    let id = $(this).val();
    let itemCode = item_array.findIndex(item =>
        item._itemId === id);

    if(itemCode !== -1 ){
        console.log(itemCode);
        $("#orderItemName").val(item_array[itemCode].itemName);
        $("#orderItemPrice").val(item_array[itemCode].UnitPrice);
        $("#itemQty").val(item_array[itemCode].Quantity);

    }else{
        $("#orderItemName").val("");
        $("#orderItemPrice").val("");
        $("#itemQty").val("");
    }

});

$('#placeOrderButton').on('click',function (){
    let orderId = generateOrderId();
    let data = $("#date").val();
    let orderCustomerId = $("#orderCustomerID").val();
    let orderItemId = $("#orderItemID").val();
    let orderQty = parseFloat($("#orderQty").val()) ;
    let total = parseFloat(document.querySelector("#totalAmount").innerText) ;
    let cash = parseFloat($("#cash").val()) ;
    let discount = parseFloat($("#discount").val()) || 0;
    let balance = $("#balance").val() ;

    if (!orderId) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Order Id!",
        });
    } else if (!data) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Date!",
        });
    } else if (!orderCustomerId) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Customer Id!",
        });
    } else if (!orderItemId) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Item Id!",
        });
    } else if (isNaN(orderQty) || orderQty <= 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Order Quantity!",
        });
    } else if (isNaN(total) || total <= 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Total Amount!",
        });
    } else if (isNaN(cash) || cash < 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Cash Amount!",
        });
    } else if (isNaN(discount) || discount < 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Discount!",
        });
    } else if (isNaN(balance)) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Balance Calculation!",
        });
    }else {
        let order = new OrderModel(
            orderId,
            data,
            orderCustomerId,
            orderItemId,
            orderQty,
            total,
            cash,
            discount,
            balance
        )
        order_array.push(order);
        clearOrderForm();
        setOrderId();
        clearOrderItemTable();
        Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Place Order Successful",
            showConfirmButton: false,
            timer: 1500
        });
    }
})
$('#getBalance').on('click',function (){
    let total = parseFloat(document.querySelector("#totalAmount").innerText) ;
    let cash = parseFloat($("#cash").val()) ;
    let discount = parseFloat($("#discount").val()) ||0;
    let balance = cash-(total-discount) ;
    $("#balance").val(balance.toFixed(2));
})
function updateItemArray() {
    let item_code = $("#orderItemID").val();
    let qtyOnHand = parseInt($("#itemQty").val());
    let qty = parseInt($("#orderQty").val());

    // Log the values for debugging
    console.log("Item Code:", item_code);
    console.log("Quantity on Hand:", qtyOnHand);
    console.log("Quantity Ordered:", qty);

    // Find the item in the array
    let item = item_array.find(item => item._itemId === item_code);

    // Check if item exists
    if (item) {
        item._Quantity = qtyOnHand - qty;
        console.log("Updated Item:", item);
    } else {
        console.error(`Item not found in itemArray for code: ${item_code}`);
    }
}




