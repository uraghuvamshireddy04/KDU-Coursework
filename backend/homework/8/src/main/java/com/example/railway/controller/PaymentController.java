package com.example.railway.controller;

import com.example.railway.model.PaymentEvent;
import com.example.railway.service.PaymentService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping
    public String pay(@RequestParam String bookingId, @RequestParam double amount) {
        return paymentService.makePayment(bookingId, amount);
    }

}
