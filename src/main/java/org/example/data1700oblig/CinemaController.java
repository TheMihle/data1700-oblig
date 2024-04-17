package org.example.data1700oblig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CinemaController {

    @Autowired
    private OrderRepository repository;

//    GetMappings
    @GetMapping("/getOrders")
    public List<Order> getList() {
        return repository.getAllOrders();
    }

    @GetMapping("/getMovies")
    public List<Movie> getMovies() {
        return repository.getMovies();
    }

//    PostMappings
    @PostMapping("/summitOrder")
    public void summit(Order order) {
        repository.saveOrder(order);
    }

//    DeleteMappings
    @DeleteMapping("/deleteOrders")
    public void deleteOrders() {
        repository.deleteOrders();
    }

    @DeleteMapping("/deleteOrder")
    public void deleteOrder(@RequestParam("id") int id) {
        repository.deleteOrder(id);
    }
}
