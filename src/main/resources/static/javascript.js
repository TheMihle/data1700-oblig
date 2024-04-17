// Run at page load to load movies and orders on to the website
$.get("/getOrders").then(data => {
    document.getElementById("ticket-list").innerHTML = createOrderTable(data);
}).catch(() => errorMessagee("Could not reach server, try again later"))
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

    // Send and receive data to backend
    $.post("/summitOrder", order).done(() =>{
        $.get("/getOrders", data => {
            document.getElementById("ticket-list").innerHTML = createOrderTable(data);
        }).catch(() => errorMessagee("Could not reach server, try again later"))
    }).catch(() => errorMessagee("Could not reach server, try again later"))


    // Clear input fields
    clearInputs()
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
    // $.post("/deleteOrders").catch(() => errorMessagee("Could not reach server, try again later"))

    fetch("/deleteOrders", {method: "DELETE"})
        .then((response) => {
            if (!response.ok) errorMessagee("Could not reach server, try again later")
        })

    document.getElementById("ticket-list").innerHTML = "";
}

// Delete individual order based on ID
function deleteOrder(id) {
    $.post("/deleteOrder?id="+ id).done(() => {
        $.get("/getOrders", data => {
            document.getElementById("ticket-list").innerHTML = createOrderTable(data);
        }).catch(() => errorMessagee("Could not reach server, try again later"))
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
                        "<th>Delete:</th></tr>";
    for (const order of orders) {
        table += "<tr>" +
                `<td>${order.movie}</td>` +
                `<td>${order.amount}</td>` +
                `<td>${order.firstName}</td>` +
                `<td>${order.lastName}</td>` +
                `<td>${order.phoneNumber}</td>` +
                `<td>${order.email}</td>` +
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