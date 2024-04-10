package org.example.data1700oblig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CinemaController {

    @Autowired
    private OrderRepository repository;

    @PostMapping("/delete")
    public void deleteOrders() {
        repository.deleteOrders();
    }

    @PostMapping("/summitOrder")
    public void summit(Order order) {
        repository.saveOrder(order);
    }

    @GetMapping("/getOrders")
    public List<Order> getList() {
        return repository.getAllOrders();
    }

    @GetMapping("/getMovies")
    public List<Movie> getMovies() {
        return repository.getMovies();
    }

}
