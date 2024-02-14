
let orders = [];
function summitOrder() {
    let validatonOk = false;

    // Reads input fields in to an object
    let order = {
       movie : document.getElementById("movie").value,
       number : document.getElementById("number").value,
       firstName : document.getElementById("first-name").value,
       lastName : document.getElementById("last-name").value,
       phoneNumber : document.getElementById("phone-number").value,
       email : document.getElementById("email").value
    }

    if (order.movie === "") {
        document.getElementById("movie-error").innerText = "Required field";
    } else {
        document.getElementById("movie-error").innerText = "";
    }

    if (order.number === "") {
        document.getElementById("number-error").innerText = "Required field";
    } else if (!isNaN(Number(order.number))) {
        document.getElementById("number-error").innerText = "Must be a Number";
    } else {
        document.getElementById("number-error").innerText = "";
    }

    if (order.firstName === "") {
        document.getElementById("first-name-error").innerText = "Required field";
    } else {
        document.getElementById("first-name").innerText = "";
    }

    if (order.lastName === "") {
        document.getElementById("last-name-error").innerText = "Required field";
    } else {
        document.getElementById("last-name-error").innerText = "";
    }

    if (order.phoneNumber === "") {
        document.getElementById("phone-number-error").innerText = "Required field";
    } else if (!isNaN(Number(order.number))) {
        document.getElementById("phone-number-error").innerText = "Must be a Number";
    } else if (order.phoneNumber.length !== 8) {
        document.getElementById("phone-number-error").innerText = "Must be 8 numbers long";
    } else {
        document.getElementById("phone-number-error").innerText = "";
    }

    if (order.email === "") {
        document.getElementById("email-error").innerText = "Required field";
    } else {
        document.getElementById("email-error").innerText = "";
    }


    orders.push(order);

    // Debug
    console.log(order);

    // Writes array to website
    document.getElementById("ticket-list").innerHTML = createOrderTable(orders);

    // Clear input fields
    // clearInputs()
}

// Clear input fields
function clearInputs() {
    document.getElementById("movie").value = "";
    document.getElementById("number").value = "";
    document.getElementById("first-name").value = "";
    document.getElementById("last-name").value = "";
    document.getElementById("phone-number").value = "";
    document.getElementById("email").value = "";
}

// Deletes orders in array
function deleteOrders() {
    orders = [];
    document.getElementById("ticket-list").innerHTML = "";
}

// Returns a html table with all contents of order array
function createOrderTable(orders) {
    let table = "<table> <tr><th>Movie:</th><th>Number:</th><th>First Name:</th>" +
                       "<th>Last Name:</th><th>Phone number:</th><th>Email:</th></tr>";
    for (let order of orders) {
        table += "<tr><td>" + order.movie + "</td><td>" + order.number + "</td><td>" + order.firstName + "</td><td>" + order.lastName + "</td><td>" + order.phoneNumber + "</td><td>" + order.email + "</td></tr>";
    }

    table += "<table>"

    return table;
}