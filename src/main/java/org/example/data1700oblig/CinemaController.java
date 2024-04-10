package org.example.data1700oblig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
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
    public List<String> getMovies() {
        List<String> movies = new ArrayList<>();
        movies.add("Interstellar");
        movies.add("Arrival");
        movies.add("Captain Philips");
        movies.add("Everything Everywhere All At Once");
        movies.add("Parasite");
        movies.add("Dune: Part one");
        movies.add("Dune: Part two");
        return movies;
    }

}
