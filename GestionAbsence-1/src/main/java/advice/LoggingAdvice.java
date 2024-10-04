package advice;



import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.javapoet.ClassName;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAdvice {
    Logger log = LoggerFactory.getLogger(LoggingAdvice.class);

    @Pointcut(value = "execution(* com.enicarthage.controllers.*.*(..) )")
    public  void myPointcut(){}
    @Around("myPointcut()")


    public  Object applicationLogger(ProceedingJoinPoint pjp) throws Throwable{
        ObjectMapper mapper = new ObjectMapper();
        mapper.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);

        String methodeName=pjp.getSignature().getName() ;
        String className=pjp.getTarget().getClass().toString() ;
        Object[] array =pjp.getArgs();
        log.info("methode "+ className+":"+methodeName+"()"+"arguments :"+mapper.writeValueAsString(array));
        Object object =pjp.proceed();
        log.info( className+":"+methodeName+"()"+"Response :"+mapper.writeValueAsString(object));

        return  object ;

    }

}