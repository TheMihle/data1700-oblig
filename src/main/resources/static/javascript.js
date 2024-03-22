// Run at page load to load movies and orders on to the website
$.get("/getOrders").then(data => {
    document.getElementById("ticket-list").innerHTML = createOrderTable(data);
})
$.get("/getMovies").then(data => {
    populateMovies(data);
})

// Inserts array of movie as options in to movie dropdown
function populateMovies(movies){
   let html = "";
    for (let movie of movies) {
        html += "<option>" + movie + "</option>";
    }
    document.getElementById("movie").innerHTML += html;
}


// Summiting an order
function summitOrder() {

    // Reads input fields in to an object
    let order = {
       movie : document.getElementById("movie").value,
       number : document.getElementById("number").value,
       firstName : document.getElementById("first-name").value,
       lastName : document.getElementById("last-name").value,
       phoneNumber : document.getElementById("phone-number").value,
       email : document.getElementById("email").value
    }

    // Validate order
    if (validateOrder(order)) {

    // Send and receive data to backend
    $.post("/summitOrder", order).done(() =>{
        $.get("/getOrders", data => {
            document.getElementById("ticket-list").innerHTML = createOrderTable(data);
    })})

        // Clear input fields
        clearInputs()
    }
}

function validateOrder(order) {
    let validationOk = true;

    // movie validation
    if (order.movie === "") {
        document.getElementById("movie-error").innerText = "Required field";
        validationOk = false;
    } else {
        document.getElementById("movie-error").innerText = "";
    }

    // number validation
    if (order.number === "") {
        document.getElementById("number-error").innerText = "Required field";
        validationOk = false;
    } else if (isNaN(Number(order.number))) {
        document.getElementById("number-error").innerText = "Must be a Number";
        validationOk = false;
    } else if (order.number <=0 || order.number >100) {
        document.getElementById("number-error").innerText = "Must be between 1 and 100";
        validationOk = false;
    } else {
        document.getElementById("number-error").innerText = "";
    }

    // First name validation
    if (order.firstName === "") {
        document.getElementById("first-name-error").innerText = "Required field";
        validationOk = false;
    } else {
        document.getElementById("first-name-error").innerText = "";
    }

    // Last name validation
    if (order.lastName === "") {
        document.getElementById("last-name-error").innerText = "Required field";
        validationOk = false;
    } else {
        document.getElementById("last-name-error").innerText = "";
    }

    // Phone number validation
    if (order.phoneNumber === "") {
        document.getElementById("phone-number-error").innerText = "Required field";
        validationOk = false;
    } else if (isNaN(Number(order.phoneNumber))) {
        document.getElementById("phone-number-error").innerText = "Must be a Number";
        validationOk = false;
    } else if (order.phoneNumber.length < 4 && order.phoneNumber.length > 13) {
        console.log(order.phoneNumber.length)
        document.getElementById("phone-number-error").innerText = "Must be between 4 and 13 numbers long";
        validationOk = false;
    } else {
        document.getElementById("phone-number-error").innerText = "";
    }

    // Email validation
    const emailRe = /^.+@[A-Za-z0-9]\.[A-Za-z0-9]{2,}$/
    if (order.email === "") {
        document.getElementById("email-error").innerText = "Required field";
        validationOk = false;
    } else if (!emailRe.test(order.email)) {
        document.getElementById("email-error").innerText = "Must be a valid email";
        validationOk = false;
    } else {
        document.getElementById("email-error").innerText = "";
    }

    if (validationOk) return true;
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

// Deletes currently stored orders
function deleteOrders() {
    $.post("/delete")
    document.getElementById("ticket-list").innerHTML = "";
}

// Returns a html table with all contents of order array
function createOrderTable(orders) {
    let table = "<table class='table table-striped table-bordered'> <tr><th>Movie:</th><th>Number:</th><th>First Name:</th>" +
                       "<th>Last Name:</th><th>Phone number:</th><th>Email:</th></tr>";
    for (let order of orders) {
        table += "<tr><td>" + order.movie + "</td><td>" + order.number + "</td><td>" + order.firstName +
                 "</td><td>" + order.lastName + "</td><td>" + order.phoneNumber + "</td><td>" + order.email + "</td></tr>";
    }
    table += "<table>"

    return table;
}