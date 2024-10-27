let item_array = [];

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

$("#itemSaveButton").on("click",function (){
    console.log("click item save btn");
    let itemId = $('#itemId').val();
    let itemName = $('#itemName').val();
    let Quantity = $('#Quantity').val();
    let UnitPrice = $('#UnitPrice').val();

    console.log("itemId" , itemId);
    console.log("itemName" , itemName);
    console.log("Quantity" , Quantity);
    console.log("UnitPrice" , UnitPrice);

    let item = {
        id:item_array.length+1,
        itemId: itemId,
        itemName: itemName,
        Quantity:Quantity,
        UnitPrice:UnitPrice,
    };

    item_array.push(item);
    loadItemTable();
});