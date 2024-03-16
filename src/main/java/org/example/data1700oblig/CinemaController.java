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
}
