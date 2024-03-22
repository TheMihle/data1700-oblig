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
    for (const movie of movies) {
        html += "<option>" + movie + "</option>";
    }
    document.getElementById("movie").innerHTML += html;
}

// Summiting an order
function summitOrder() {

    // Reads input fields in to an object
    const order = {
       movie : document.getElementById("movie").value,
       number : document.getElementById("number").value,
       firstName : document.getElementById("first-name").value,
       lastName : document.getElementById("last-name").value,
       phoneNumber : document.getElementById("phone-number").value,
       email : document.getElementById("email").value
    }

    // Send and receive data to backend
    $.post("/summitOrder", order).done(() =>{
        $.get("/getOrders", data => {
            document.getElementById("ticket-list").innerHTML = createOrderTable(data);
        })
    })

    // Clear input fields
    clearInputs()
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
    let table = "<table class='table table-striped table-bordered'><tr>" +
                        "<th>Movie:</th>" +
                        "<th>Number:</th>" +
                        "<th>First Name:</th>" +
                        "<th>Last Name:</th>" +
                        "<th>Phone number:</th>" +
                        "<th>Email:</th></tr>";
    for (const order of orders) {
        table += "<tr><td>" + order.movie +
                 "</td><td>" + order.number +
                 "</td><td>" + order.firstName +
                 "</td><td>" + order.lastName +
                 "</td><td>" + order.phoneNumber +
                 "</td><td>" + order.email + "</td></tr>";
    }
    table += "<table>"

    return table;
}