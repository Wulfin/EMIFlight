package ma.ac.emi.ginfo.hg.emiflights;

import ma.ac.emi.ginfo.hg.emiflights.entities.User;
import ma.ac.emi.ginfo.hg.emiflights.entities.ref.Civility;
import ma.ac.emi.ginfo.hg.emiflights.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.time.LocalDate;
import java.time.Month;
import java.util.Collections;

@SpringBootApplication
public class EmiFlightsApplication{
    private final UserRepository userRepository;

    public EmiFlightsApplication(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(EmiFlightsApplication.class, args);
    }


    /*@Bean
    public CommandLineRunner commandLineRunner(){

        return args -> {

            User user = new User("Saif Elislam", "Bettaoui", "", null, LocalDate.of(2002, Month.JANUARY, 25),
                    "adress","saif", "password", "",
                    Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"))
            );
            userRepository.save(user);
            user = new User("Anas", "Fejoui", "", null, LocalDate.of(2002, Month.JANUARY, 25),
                    "adress","anas", "password_2","",
                    Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"))
            );
            userRepository.save(user);
            user = new User("Youness", "Ifrah", "", null, LocalDate.of(2001, Month.JANUARY, 25),
                    "adress","youness", "password_3", "",
                    Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"))
            );
            userRepository.save(user);
            user = new User("Houssam Eddine", "El Jazouli", "", null, LocalDate.of(2001, Month.JANUARY, 25),
                    "adress","houssam", "password_4","",
                    Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"))
            );
            userRepository.save(user);
        };
    }*/
}
