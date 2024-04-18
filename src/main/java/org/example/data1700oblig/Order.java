package org.example.data1700oblig;

public class Order {

    //    Attributes
    private int id;
    private String movie;
    private int amount;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;

//    Constructors
    public Order(int id, String movie, int amount, String firstName, String lastName, String phoneNumber, String email) {
        this.id = id;
        this.movie = movie;
        this.amount = amount;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    public Order(String movie, int amount, String firstName, String lastName, String phoneNumber, String email) {
        this.movie = movie;
        this.amount = amount;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    public Order(){}

//    Getters and Setters
    public String getMovie() {
        return movie;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
    public void setMovie(String movie) {
        this.movie = movie;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
