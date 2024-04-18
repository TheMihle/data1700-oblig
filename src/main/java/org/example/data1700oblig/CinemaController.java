package org.example.data1700oblig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CinemaController {

    @Autowired
    private OrderRepository repository;

//    GetMappings
    @GetMapping("/getMovies")
    public List<Movie> getMovies() {
        return repository.getMovies();
    }

    @GetMapping("/getOrders")
    public List<Order> getList() {
        return repository.getAllOrders();
    }

    @GetMapping("/getOrder")
    public Order getOrder(@RequestParam("id") int id) {
        return repository.getOrderById(id);
    }

//    PostMappings
    @PostMapping("/summitOrder")
    public void summit(Order order) {
        repository.saveOrder(order);
    }

    @PostMapping("/updateOrder")
    public void updateOrder(Order order) {
        repository.updateOrder(order);
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
