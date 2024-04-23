// Run at page load to load movies and orders on to the website
// Defer in HTML delays script execution until the end of DOM loading
updateTable()
$.get("/getMovies").then(data => {
    populateMovies(data);
}).catch(() => errorMessagee("Could not reach server, try again later"))

// Inserts array of movie as options in to movie dropdown
function populateMovies(movies){
   let html = "";
    for (const movie of movies) {
        html += "<option>" + movie.title + "</option>";
    }
    document.getElementById("movie").innerHTML += html;
    document.getElementById("movie-update").innerHTML += html;
}

// Updates the table from server
function updateTable() {
    $.get("/getOrders").then(data => {
            document.getElementById("ticket-list").innerHTML = createOrderTable(data);
        }).catch(() => errorMessagee("Could not reach server, try again later"))
}

// Summiting an order
function summitOrder() {

    // Reads input fields in to an object
    const order = {
       movie : document.getElementById("movie").value,
       amount : document.getElementById("amount").value,
       firstName : document.getElementById("first-name").value,
       lastName : document.getElementById("last-name").value,
       phoneNumber : document.getElementById("phone-number").value,
       email : document.getElementById("email").value
    }

    // Validate order
    if (validateOrder(order)) {

    // Send and receive data to backend
    $.post("/summitOrder", order).done(() =>{
        updateTable()
    }).catch(() => errorMessagee("Could not reach server, try again later"))


        // Clear input fields
        clearInputs()
    }
}

// Checks if inputs are valid
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
    if (order.amount === "") {
        document.getElementById("number-error").innerText = "Required field";
        validationOk = false;
    } else if (isNaN(Number(order.amount))) {
        document.getElementById("number-error").innerText = "Must be a Number";
        validationOk = false;
    } else if (order.amount <=0 || order.amount >100) {
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

// Enable editing of an order
function updateSelectOrder(id) {
    let order;
    $.get("/getOrder?id=" + id)
        .then(data => {
        order = {
            id : data.id,
            movie : data.movie,
            amount : data.amount,
            firstName : data.firstName,
            lastName : data.lastName,
            phoneNumber : data.phoneNumber,
            email : data.email
        }
    }).done(() => {
        document.getElementById("id-update").value = order.id;
        document.getElementById("movie-update").value = order.movie;
        document.getElementById("amount-update").value = order.amount;
        document.getElementById("first-name-update").value = order.firstName;
        document.getElementById("last-name-update").value = order.lastName;
        document.getElementById("phone-number-update").value = order.phoneNumber;
        document.getElementById("email-update").value = order.email;
    });

    // Display edit order form
    document.getElementById("update-form").style.display = "block";

}

// Updates the order
function updateOrder() {
     // Reads input fields in to an object
    const order = {
        id : document.getElementById("id-update").value,
        movie : document.getElementById("movie-update").value,
        amount : document.getElementById("amount-update").value,
        firstName : document.getElementById("first-name-update").value,
        lastName : document.getElementById("last-name-update").value,
        phoneNumber : document.getElementById("phone-number-update").value,
        email : document.getElementById("email-update").value
    }

    $.post("/updateOrder", order).done(() =>{
        updateTable()
    }).catch(() => errorMessagee("Could not reach server, try again later"))

    // Hides edit order form
    document.getElementById("update-form").style.display = "none"
}

function cancelUpdate() {
    document.getElementById("update-form").style.display = "none"
}

// Clear input fields
function clearInputs() {
    document.getElementById("movie").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("first-name").value = "";
    document.getElementById("last-name").value = "";
    document.getElementById("phone-number").value = "";
    document.getElementById("email").value = "";
}

// Deletes currently stored orders
function deleteOrders() {
    fetch("/deleteOrders", {method: "DELETE"})
        .then((response) => {
            if (!response.ok) errorMessagee("Could not reach server, try again later")
            else document.getElementById("ticket-list").innerHTML = "";
        })
}

// Delete individual order based on ID
function deleteOrder(id) {
    fetch("/deleteOrder?id=" + id, {method: "DELETE"})
        .then((response) => {
            if (!response.ok) errorMessagee("Could not reach server, try again later")
            else updateTable();
        })
}

// Returns a html table with all contents of order array
function createOrderTable(orders) {
    let table = "<table class='table table-striped table-bordered'><tr>" +
                        "<th>Movie:</th>" +
                        "<th>Amount:</th>" +
                        "<th>First Name:</th>" +
                        "<th>Last Name:</th>" +
                        "<th>Phone number:</th>" +
                        "<th>Email:</th>" +
                        "<th>Edit:</th>" +
                        "<th>Delete:</th></tr>";
    for (const order of orders) {
        table += "<tr>" +
                `<td>${order.movie}</td>` +
                `<td>${order.amount}</td>` +
                `<td>${order.firstName}</td>` +
                `<td>${order.lastName}</td>` +
                `<td>${order.phoneNumber}</td>` +
                `<td>${order.email}</td>` +
                `<td><button class='btn btn-success' onclick='updateSelectOrder(${order.id})'>Edit</button>` +
                `<td><button class='btn btn-danger' onclick='deleteOrder(${order.id})'>Delete</button></td>` +
                "</tr>";
    }
    table += "<table>"

    return table;
}

// Displays error message on website
function errorMessagee(error) {
    document.getElementById("backend-error").style.display = "block"
    document.getElementById("backend-error").innerText = error;
}

// Hides error message on website
function clearErrorMessage() {
    document.getElementById("backend-error").style.display = "none"
    document.getElementById("backend-error").innerText = "";
}