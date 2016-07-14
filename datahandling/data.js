/**
 * Created by Nikshala on 6/26/2016.
 */


/**
 * Array Contains Customer / Person Details
 * @type {Array}
 */
var persons = new Array();
persons.push(new Person("Bob Smith", new Address("1200 stevenson common", "#202", "Fremont", "California", 94556), "02-23-1976", "bobsmith@yahoo.com", 5109876574));
persons.push(new Person("John Kennedy", new Address("1240 Elcamino real", "#206", "San Jose", "California", 93412), "04-07-1986", "john1986@outlook.com", 4102345698));
persons.push(new Person("Fantin Justin", new Address("1270 Mozarat ave", "#450", "Newyork", "New Jersey", 71403), "10-11-1983", "fantin10@gmail.com", 9108763524));
persons.push(new Person("Robert Rajan", new Address("1450 canyan cmn", "#312", "Seattle", "California", 956430), "09-21-1998", "rajan@yahoo.com", 4136439652));
persons.push(new Person("Emily Wilson", new Address("3247 beethoven common", "#678", "wisconsin", "Florida", 97658), "05-25-1987", "wilson@gamilcom", 415328754));
persons.push(new Person("Wendy Winter", new Address("1500 galludet dr", "#458", "Newyork", "New Jersey", 91320), "07-22-1965", "winterwendy@outlook.com", 3121289654));
persons.push(new Person("Jeb bush", new Address("1250 Guardino dr, mission cmn", "#420", "San Francisco", "California", 94305), "04-17-1985", "bush@gmail.com", 4124678900));
persons.push(new Person("Tim Kaine", new Address("1280 Walnut creek", "#321", "Wisconsin", "Florida", 94111), "03-25-1974", "kaine@yahoo.com", 8905241367));
persons.push(new Person("Jeffrey Marsh", new Address("188 spear street", "#250", "San Franciso", "California", 94538), "01-31-1986", "jeffrey@gmail.com", 5109763211));
persons.push(new Person("Antony Peter", new Address("1324 market street", "#345", "Dulles", "Virgina", 101204), "05-20-1073", "antopeter@outlook.com", 9102349453));
persons.push(new Person("Fred Smith", new Address("1227 battery streer", "#425", "Newyork", "New Jersey", 71230), "06-21-1966", "smith@outlook.com", 3219085064));
persons.push(new Person("John Robert", new Address("sherroton chin ave", "#321", "San Dieago", "California", 94000), "08-30-1986", "johnr@yahoo.com", 3245617983));
persons.push(new Person("Jim kaine", new Address("Warfs Ave", "#423", "Austin", "Texas", 98760), "04-04-1987", "jim@gmail.com", 9765403210));
persons.push(new Person("Bill Gates", new Address("1280 Stevenson common", "#213", "Houston", "Texas", 98750), "03-04-1969", "bill@outlook.com", 9213876950));
persons.push(new Person("David Walker", new Address("1220 Mission common", "#305", "Richmond", "Virgina", 101230), "02-22-1963", "david1963@yahoo.com", 5109607890));


/**
 * Factory Function to Create Person Details
 * @param name
 * @param address - This an address object which holds address details.
 * @param dob
 * @param email
 * @param phonenumber
 * @constructor
 */
function Person(name, address, dob, email, phonenumber) {
    this.name = name;
    this.address = address;
    this.dob = dob;
    this.phonenumber = phonenumber;
    this.email = email;
}

/**
 * Helper Function that helps in creating Address Object
 * @param addressline1
 * @param addressline2
 * @param city
 * @param state
 * @param zipcode
 * @constructor
 */
function Address(addressline1, addressline2, city, state, zipcode) {
    this.addressline1 = addressline1;
    this.addressline2 = addressline2;
    this.city = city;
    this.state = state;
    this.zipcode = zipcode;
}

/**
 * Function Generates Name in the drop down onLoad.
 */
window.onload = function () {
    generateNames();
};

/**
 * This function helps in generating names for the drop down, that is, it dynamically adds the name to the option
 * value in the select tag.
 */
function generateNames() {
    select = document.getElementById("Name");
    for (var i = 0; i < persons.length; i++) {
        var opt = document.createElement('option');
        opt.value = persons[i].name;
        opt.innerHTML = persons[i].name;
        select.appendChild(opt);
    }
}

/**
 * This Function Dynamically displays the person details in the required field onSelecting the name from the drop down.
 */
function displayValues() {
    var selectedValue = document.getElementById("Name").options[document.getElementById("Name").selectedIndex].value;

    /* assume that there is only 1 values in filteredValues array, as the filter is by name. */
    var filteredValues = filter(persons, function (person) {
        return person.name === selectedValue;
    });

    document.getElementById("DOB").value = filteredValues[0].dob;
    document.getElementById("address").value = filteredValues[0].address.addressline1 + filteredValues[0].address.addressline2;
    document.getElementById("state").value = filteredValues[0].address.state;
    document.getElementById("city").value = filteredValues[0].address.city;
    document.getElementById("zipcode").value = filteredValues[0].address.zipcode;
    document.getElementById("contactno").value = filteredValues[0].phonenumber;
    document.getElementById("mailid").value = filteredValues[0].email;
}


/**
 * Function helps in filtering details based on the filter condition.
 * @param array - This Array is the array to be filtered .
 * @param predicate is an anonymous function which has the base condition for filtering.
 * @returns {Array} -This Array holds the filtered values from the array
 */
function filter(array, predicate) {
    var filteredValues = [];
    each(array, function (element) {
        if (predicate(element)) {
            filteredValues.push(element);
        }
    });
    return filteredValues;
}
/**
 * Helper function that hepls in iterating array and objects
 * @param array
 * @param func - This is the callback function
 */
function each(array, func) {
    if (Array.isArray(array)) {
        for (var i = 0; i < array.length; i++) {
            func(array[i], i);
        }
    } else {
        for (var key in array) {
            func(array[key], key);
        }
    }
}
/**
 * This function displays the person deatils in the form of tabele on clicking search button based on the filter
 * condition.
 */
function displayResults() {
    var value = document.getElementById("searchvalue").value.trim();
    var selvalue = document.getElementById("option").options[document.getElementById("option").selectedIndex].value;

    /**
     * This invokes filterbyvalue function based on the filter condition, it maps the results by invoking map
     * function
     */
    var people = filterbyvalues(persons, function (person) {
        var address = person.address.addressline1 + person.address.addressline2;
        if (person.address.state.toString().toMyLowerCaseImplementation().myImplementationOfIncludes(value.toMyLowerCaseImplementation()) && selvalue === "State") {
            return true;
        } else if (person.address.city.toString().toMyLowerCaseImplementation().myImplementationOfIncludes(value.toMyLowerCaseImplementation()) && selvalue === "City") {
            return true;
        } else if (person.email.toString().toMyLowerCaseImplementation().myImplementationOfIncludes(value.toMyLowerCaseImplementation()) && selvalue === "MailId") {
            return true;
        } else if (person.dob.toString().myImplementationOfIncludes(value) && selvalue === "DOB") {
            return true;
        } else if (person.name.toString().toMyLowerCaseImplementation().myImplementationOfIncludes(value.toMyLowerCaseImplementation()) && selvalue === "Name") {
            return true;
        } else if (person.phonenumber.toString().myImplementationOfIncludes(value) && selvalue === "PhoneNumber") {
            return true;
        } else if (address.toString().toMyLowerCaseImplementation().myImplementationOfIncludes(value.toMyLowerCaseImplementation()) && selvalue === "Address") {
            return true;
        } else if (person.address.zipcode.toString().myImplementationOfIncludes(value) && selvalue === "Zipcode") {
            return true;
        }
    });

    /* Map that converts the filtered persons array into a HTML table row */
    var results = map(people, function (person, index) {
        return "<tr><td>" + person.name +
            "</td><td>" + person.dob +
            "</td><td>" + person.address.addressline1 +
            "</td><td>" + person.address.addressline2 +
            "</td><td>" + person.address.city +
            "</td><td>" + person.address.state +
            "</td><td>" + person.address.zipcode +
            "</td><td>" + person.phonenumber +
            "</td><td>" + person.email +
            "</td></tr>";
    });
    document.getElementById("results").innerHTML = arrayJoin(results, "");
}
/**
 *Implementation of higher order function Map
 * @param array
 * @param func - Callback.
 * @returns {Array}
 */
function map(array, func) {
    var resultvalues = [];
    each(array, function (element, index) {
        resultvalues.push(func(element, index));
    });
    return resultvalues;
}
/**
 * My Implementation of join function.
 * @param array
 * @param joinWith - Can be any character or string
 * @returns {string}
 */
function arrayJoin(array, joinWith) {
    var result = "";
    each(array, function (element, index) {
        if (index === 0) {
            result += element;
        } else {
            result += joinWith + element;
        }
    });
    return result;
}
/**
 * Implementation of higher order function filter
 * @param array
 * @param predicate - Callback
 * @returns {Array}
 */
function filterbyvalues(array, predicate) {
    var filtervalues = [];
    each(array, function (element) {
        if (predicate(element)) {
            filtervalues.push(element);
        }
    });
    return filtervalues;
}

/**
 * My Implementation of toLowercase() Library.
 * @returns {string}
 */
String.prototype.toMyLowerCaseImplementation = function () {
    var a = "";
    for (var i = 0; i <= this.length; i++) {
        if (this.charCodeAt(i) >= 65 && this.charCodeAt(i) <= 90) {
            a += String.fromCharCode(this.charCodeAt(i) + 32);
        } else {
            a += this.charAt(i);
        }
    }
    return a;
}

/**
 * My Implentation of includes() Library.
 * @param value
 * @returns {boolean}
 */
String.prototype.myImplementationOfIncludes = function (value) {
    for (var i = 0, j = value.length; j < this.length + 1; i++, j++) {
        if (this.substring(i, j) === value) {
            return true;
        }
    }
    return false;
}