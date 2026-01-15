package com.example.smartlock.aspects;

import com.example.smartlock.dto.LockResponse;

import com.example.smartlock.service.ExceptionCall;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class SmartLockAspects {
    private final Logger logger = LoggerFactory.getLogger(SmartLockAspects.class);
    private final ExceptionCall exceptionCall;

    public SmartLockAspects(ExceptionCall exceptionCall) {
        this.exceptionCall = exceptionCall;
    }

    @Before("@annotation(com.example.smartlock.annotation.AccessDoor) && args(user)")
    public void logAttempt(String user) {
        logger.info("ACCESS ATTEMPT: User {} is approaching the door", user);
    }
    @AfterReturning(value = "@annotation(com.example.smartlock.annotation.AccessDoor)", returning = "result")
    public void logSuccess(LockResponse result) {
        logger.info("SUCCESS: User {} has entered the building", result.user());
    }

    @AfterThrowing(pointcut = "within(com.example.smartlock.service..*)", throwing = "ex")
    public void initiateEmergencyProtocol(Exception ex) {
        logger.error("ALARM TRIGGERED: System error detected. Message: {}", ex.getMessage());
        exceptionCall.call();
    }
}
