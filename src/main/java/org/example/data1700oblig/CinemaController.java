package org.example.data1700oblig;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class CinemaController {

    public List<Order> orders = new ArrayList<>();

    @PostMapping("/delete")
    public void deleteOrders() {
        orders.clear();
    }

    @PostMapping("/summitOrder")
    public void summit(Order order) {
        orders.add(order);
    }

    @GetMapping("/getOrders")
    public List<Order> getList() {
        return orders;
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
