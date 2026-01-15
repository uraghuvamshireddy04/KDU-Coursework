package com.example.smartlock.service;

import org.springframework.stereotype.Service;

@Service
public class ExceptionCall {
    public void call() {
        System.out.println("hardware failure Exception");
    }
}
