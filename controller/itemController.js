import ItemModel from "../model/itemModel.js";
import {item_array} from "../db/database.js";

const loadItemTable = () =>{
    $("#itemTableBody").empty();
    item_array.map((item_object,index) =>{
        console.log(item_object);
        let data=`<tr>
            <td>${item_object.itemId}</td
            ><td>${item_object.itemName}</td>
            <td>${item_object.Quantity}</td>
            <td>${item_object.UnitPrice}</td>
            </tr>`
        $("#itemTableBody").append(data);
    })
}

const cleanItemForm  = () => {
    $('#itemId').val("");
    $('#itemName').val("")
    $('#Quantity').val("");
    $('#UnitPrice').val("");
}
let selected_item_index = null;

$("#itemSaveButton").on("click",function (){
    console.log("click item save btn");
    let itemId = $('#itemId').val();
    let itemName = $('#itemName').val();
    let Quantity = $('#Quantity').val();
    let UnitPrice = $('#UnitPrice').val();

    if(itemId.length===0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Item Id!",
        });
    }else if(itemName.length===0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Item Name!",
        });
    }else if(Quantity.length===0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Quantity!",
        });
    }else if(UnitPrice.length===0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid UnitPrice!",
        });
    }else{

        let item = new ItemModel(
            itemId,
            itemName,
            Quantity,
            UnitPrice
        );

        item_array.push(item);
        cleanItemForm()
        loadItemTable();
    }
});

$('#itemTableBody').on('click','tr',function (){
    let index = $(this).index();

    selected_item_index = index;

    let item_obj = item_array[index];

    let itemId = item_obj.itemId;
    let itemName = item_obj.itemName;
    let Quantity = item_obj.Quantity;
    let UnitPrice = item_obj.UnitPrice;

    $('#itemId').val(itemId);
    $('#itemName').val(itemName);
    $('#Quantity').val(Quantity);
    $('#UnitPrice').val(UnitPrice);
})