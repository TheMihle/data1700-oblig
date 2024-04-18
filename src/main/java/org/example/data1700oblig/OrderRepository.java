package org.example.data1700oblig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Repository
public class OrderRepository {

    @Autowired
    public JdbcTemplate db;

//    Select functions
    public List<Order> getAllOrders() {
        String sql = "SELECT * FROM Orders ORDER BY lastName";
        return db.query(sql,new BeanPropertyRowMapper<>(Order.class));
    }

    public List<Movie> getMovies() {
        String sql = "SELECT title FROM Movies";
        return db.query(sql, new BeanPropertyRowMapper<>(Movie.class));
    }

    public Order getOrderById(int id) {
        String sql = "SELECT * FROM Orders WHERE id = ?";
        return db.queryForObject(sql, new BeanPropertyRowMapper<>(Order.class), id);
    }

//    Insert functions
    public void saveOrder(Order order) {
        String sql = "INSERT INTO Orders (movie, amount, firstName, lastName, phoneNumber, email) VALUES(?, ?, ?, ?, ? ,?)";
        db.update(sql, order.getMovie(), order.getAmount(), order.getFirstName(), order.getLastName(), order.getPhoneNumber(), order.getEmail());
    }

//    Update functions
    public void updateOrder(Order order) {
        String sql = "UPDATE Orders SET movie = ?, amount = ?, firstName = ?, lastName = ?, phoneNumber = ?, email = ? WHERE id = ?";
        db.update(sql, order.getMovie(), order.getAmount(), order.getFirstName(), order.getLastName(), order.getPhoneNumber(), order.getEmail(), order.getId());
    }

//    Delete functions
    public void deleteOrders() {
        String sql = "DELETE FROM Orders";
        db.update(sql);
    }

    public void deleteOrder(@RequestParam Integer id) {
        String sql = "DELETE FROM Orders WHERE id = ?";
        db.update(sql,id);
    }

}
