export default class ItemModel{
    constructor(itemId,itemName,Quantity,UnitPrice) {
        this._itemId = itemId;
        this._itemName =itemName;
        this._Quantity = Quantity;
        this._UnitPrice = UnitPrice;
    }

    get itemId() {
        return this._itemId;
    }

    set itemId(value) {
        this._itemId = value;
    }

    get itemName() {
        return this._itemName;
    }

    set itemName(value) {
        this._itemName = value;
    }

    get Quantity() {
        return this._Quantity;
    }

    set Quantity(value) {
        this._Quantity = value;
    }

    get UnitPrice() {
        return this._UnitPrice;
    }

    set UnitPrice(value) {
        this._UnitPrice = value;
    }
}