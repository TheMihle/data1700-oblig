package org.example.data1700oblig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class OrderRepository {

    @Autowired
    public JdbcTemplate db;

    public void saveOrder(Order order) {
        String sql = "INSERT INTO Orders (movie, amount, firstName, lastName, phoneNumber, email) VALUES(?, ?, ?, ?, ? ,?)";
        db.update(sql, order.getMovie(), order.getAmount(), order.getFirstName(), order.getLastName(), order.getPhoneNumber(), order.getEmail());
    }

    public List<Order> getAllOrders() {
        String sql = "SELECT * FROM Orders ORDER BY lastName";
        List<Order> Orders = db.query(sql,new BeanPropertyRowMapper(Order.class));
        return Orders;
    }

    public void deleteOrders() {
        String sql = "DELETE FROM Orders";
        db.update(sql);
    }

    public List<Movie> getMovies() {
        String sql = "SELECT title FROM Movies";
        List<Movie> movies = db.query(sql, new BeanPropertyRowMapper(Movie.class));
        return movies;
    }

}
