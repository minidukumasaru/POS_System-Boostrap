export default class CustomerModel{
    constructor(customer_id,fullname,address,contact) {
        this._customer_id = customer_id;
        this._fullname = fullname;
        this._address = address;
        this._contact = contact;
    }

    get customer_id() {
        return this._customer_id;
    }

    set customer_id(value) {
        this._customer_id = value;
    }

    get fullname() {
        return this._fullname;
    }

    set fullname(value) {
        this._fullname = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }

    get contact() {
        return this._contact;
    }

    set contact(value) {
        this._contact = value;
    }
}