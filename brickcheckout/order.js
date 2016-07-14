/**
 * Mapping state to shipping charge
 */
var stateToShippingCharge = {
    "California": 5,
    "Washington": 10,
    "Alaska": 15,
    "Texas": 20,
    "Florida": 25,
    "New Jersey": 30,
    "Arizona": 33
};

/**
 * function to Populate the Order summary in the checkout page upon user input
 */
function populateOrderSummary() {
    var pricePerUnit, quantity, price, total, shippingCharge;

    shippingCharge = stateToShippingCharge[document.getElementById("state").value];
    if (shippingCharge === undefined) {
        shippingCharge = 0; // if state is not chosen yet
    }

    pricePerUnit = (document.getElementById("price").value * 1);
    quantity = document.getElementById("quantitysel").value;
    price = (pricePerUnit * quantity);
    var tax = (0.10 * price);
    total = (price + tax + shippingCharge);

    document.getElementById("priceperunit").innerHTML = "$" + pricePerUnit.toFixed(2);
    document.getElementById("quantity").innerHTML = quantity;
    document.getElementById("priceofallbricks").innerHTML = price.toFixed(2);
    document.getElementById("tax").innerHTML = tax.toFixed(2);
    var numberOfLoads = Math.ceil(quantity / 1000);
    document.getElementById("shippingcharge").innerHTML = numberOfLoads * shippingCharge.toFixed(2);
    document.getElementById("totalprice").innerHTML = "$" + total.toFixed(2);
}

/**
 * Populate Order summary on page load
 */
window.onload = function () {
    populateOrderSummary();
};

/**
 * Populate order summary on changing the quantity
 */
document.getElementById("quantitysel").onchange = function () {
    populateOrderSummary();
};

/**
 * Populates Order summary on changing the state
 */
document.getElementById("state").onchange = function () {
    populateOrderSummary();
};

/**
 * The placeorder function completes placing the order.
 * Before placing  Order it validates the shippping address and card details.
 * Once the validation is done it  sends the address detail,card details and order details to the sever.
 * It uses post method to send the request to the server
 */
function placeOrder() {
    if (validate() === true) {
        var address = createAddress();
        var payment = createPayment();
        var orderdetails = createOrderDetails();
        var order = new Order(address, payment, orderdetails);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://localhost:8000/redirect_orderprocess', false);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send('order=' + JSON.stringify(order));
        document.open();
        document.write(xhr.responseText);
        document.close();
    }
}

/**
 * Creates a factory function order
 * Order function holds the address object , payment object and order details object.
 */
function Order(address, payment, orderdetails) {
    if (address instanceof Address) {
        this.address = address;
    }
    if (payment instanceof Payment) {
        this.payment = payment;
    }
    if (orderdetails instanceof OrderDetails) {
        this.orderdetails = orderdetails;
    }
}

/**
 * Factory function creates Address details
 */
function Address(fname, lname, addr1, addr2, telno, zipcode, city, state) {
    this.fname = fname;
    this.lname = lname;
    this.addr1 = addr1;
    this.addr2 = addr2;
    this.telno = telno;
    this.zipcode = zipcode;
    this.city = city;
    this.state = state;
}

/**
 * Factory function to create payment details
 */
function Payment(cname, typeofcard, modeofpayment, cardnumber, cvv, expirationdate) {
    this.cname = cname;
    this.typeofcard = typeofcard;
    this.modeofpayment = modeofpayment;
    this.cardnumber = cardnumber;
    this.cvv = cvv;
    this.expirationdate = expirationdate;
}

/**
 * Factory function to create order details
 */
function OrderDetails(quantity, priceperunit) {
    this.quantity = quantity;
    this.priceperunit = priceperunit;
}

/**
 * Helper function that reads data from UI and creates address Object
 * @returns {Address}
 */
function createAddress() {
    var fname = document.getElementById("FN").value;
    var lname = document.getElementById("LN").value;
    var addr1 = document.getElementById("A1").value;
    var addr2 = document.getElementById("A2").value;
    var telno = document.getElementById("Tn").value;
    var zipcode = document.getElementById("Zp").value;
    var city = document.getElementById("ct").value;
    var state = document.getElementById("state").value;
    var address = new Address(fname, lname, addr1, addr2, telno, zipcode, city, state);
    return address;
}

/**
 * Helper function that reads data from UI and creates payment Object
 * @returns {Payment}
 */
function createPayment() {
    var cname = document.getElementById("nameoncard").value;
    if (document.getElementById("visa").checked === true) {
        var typeofcard = document.getElementById("visa").value;
    } else {
        var typeofcard = document.getElementById("mastercard").value;
    }
    var x = document.getElementById("modeofpayment");
    var modeofpayment = x.options[x.selectedIndex].value;
    var cardnumber = document.getElementById("cardnum").value;
    var cvv = document.getElementById("cvv").value;
    var expirationdate = document.getElementById("cardexpiry").value;
    var payment = new Payment(cname, typeofcard, modeofpayment, cardnumber, cvv, expirationdate);
    return payment;
}

/**
 * Helper function that reads the data from the UI and creates order Object
 * @returns {OrderDetails}
 */
function createOrderDetails() {
    var price = (document.getElementById("price").value * 1);
    var quantity = document.getElementById("quantitysel").value;
    var orderdetails = new OrderDetails(quantity, price);
    return orderdetails;
}

/**
 * Checks if the keypressed is number key, it only allows to enter number in the input
 */
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

/**
 * Function to validate all the input fields
 * @returns {boolean}
 */
function validate() {
    if (document.getElementById("FN").value === "") {
        alert("First Name is invalid !");
        return false;
    } else if (document.getElementById("LN").value === '') {
        alert("Last ame  is invalid !");
        return false;
    } else if (document.getElementById("A1").value === "") {
        alert("Address Line1  is invalid !");
        return false;
    } else if (document.getElementById("A2").value === "") {
        alert("Address Line2 is invalid !");
        return false;
    } else if (document.getElementById("Tn").value === "") {
        alert("Telephone Number is invalid !");
        return false;
    } else if (document.getElementById("Zp").value === "") {
        alert("Zipcode is invalid !");
        return false;
    } else if (document.getElementById("state").value === "") {
        alert("State is invalid !");
        return false;
    } else if (document.getElementById("ct").value === '') {
        alert("City address is invalid !");
        return false;
    } else if (document.getElementById("visa").checked === false && document.getElementById("mastercard").checked === false) {
        alert("Type of Card Invalid");
        return false;
    } else if (document.getElementById("nameoncard").value === "") {
        alert("Name is invalid");
        return false;
    } else if ((document.getElementById("cardnum").value).length !== 16) {
        alert("Card Number is invalid");
        return false;
    } else if ((document.getElementById("cvv").value).length !== 3) {
        alert("CVV is invalid");
        return false;
    } else if (document.getElementById("cardexpiry").value === "") {
        alert("Month is invalid");
        return false;
    } else {
        return true;
    }
}