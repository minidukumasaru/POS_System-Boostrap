import ItemModel from "../model/itemModel.js";
import { item_array} from "../db/database.js";

const loadItemTable = () =>{
    $("#itemTableBody").empty();
    item_array.map((item_object,index) =>{
        console.log(item_object);
        let data=`<tr>
            <td>${item_object.itemId}</td
            ><td>${item_object.itemName}</td>
            <td>${item_object.Quantity}</td>
            <td>${item_object.UnitPrice}</td>
            <td>${item_object.Description}</td>
            </tr>`
        $("#itemTableBody").append(data);
    })
}

const clearItemForm  = () => {
    $('#itemId').val("");
    $('#itemName').val("")
    $('#Quantity').val("");
    $('#UnitPrice').val("");
    $('#Description').val("");
}
let selected_item_index = null;

$("#itemSaveButton").on("click",function (){
    console.log("click item save btn");
    let itemId = $('#itemId').val();
    let itemName = $('#itemName').val();
    let Quantity = $('#Quantity').val();
    let UnitPrice = $('#UnitPrice').val();
    let Description = $('#Description').val();

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
    }else if(Description.length===0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Description!",
        });
    }else{

        let item = new ItemModel(
            itemId,
            itemName,
            Quantity,
            UnitPrice,
            Description
        );

        item_array.push(item);
        Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Item Save Successful",
            showConfirmButton: false,
            timer: 1500
        });
        clearItemForm()
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
    let Description = item_obj.Description;

    $('#itemId').val(itemId);
    $('#itemName').val(itemName);
    $('#Quantity').val(Quantity);
    $('#UnitPrice').val(UnitPrice);
    $('#Description').val(Description);
})

// Item-Update
$('#itemUpdateButton').on('click',function (){

    Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
    })
        .then((result) =>{
            if(result.isConfirmed){
                let itemId = $('#itemId').val();
                let itemName = $('#itemName').val();
                let Quantity = $('#Quantity').val();
                let UnitPrice = $('#UnitPrice').val();
                let Description = $('#Description').val();

                let index = selected_item_index;

                let item = new ItemModel(
                    itemId,
                    itemName,
                    Quantity,
                    UnitPrice,
                    Description

                );
                item_array[selected_item_index] = item;

                clearItemForm();
                loadItemTable();
                Swal.fire("Saved!", "", "success");
            }else if(result.isDenied){
                Swal.fire("Changes are not saved", "", "info");
            }
        });
})
// Item Delete
$('#itemDeleteButton').on('click',function (){
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
            item_array.splice(selected_item_index, 1);

            clearItemForm()
            loadItemTable()
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