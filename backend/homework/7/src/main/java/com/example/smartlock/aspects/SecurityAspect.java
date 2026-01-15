package com.example.smartlock.aspects;

import com.example.smartlock.dto.LockResponse;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class SecurityAspect {
    private final Logger logger = LoggerFactory.getLogger(SecurityAspect.class);

    @Around("@annotation(com.example.smartlock.annotation.AccessDoor) && args(user)")
    public Object securityGuard(ProceedingJoinPoint joinPoint, String user) throws Throwable {
        if ("Unknown".equalsIgnoreCase(user)) {
            logger.warn("SECURITY ALERT: Unauthorized access blocked!");
            return new LockResponse("BLOCKED", user, System.currentTimeMillis());
        }
        return joinPoint.proceed();
    }

    @Around("@annotation(com.example.smartlock.annotation.MonitorBattery)")
    public Object Stopwatch(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        Object result = joinPoint.proceed();
        long duration = System.currentTimeMillis() - start;
        logger.info("PERFORMANCE: Battery check took {}ms", duration);

        return result;
    }
}