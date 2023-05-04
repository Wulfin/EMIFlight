package ma.ac.emi.ginfo.hg.emiflights.authentication.config;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Repository
public class UserDao {
    private static List<UserDetails> APPLICATION_USERS = new ArrayList<>(Arrays.asList(
            new User("saif", "password",
                    Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"))
            ),
            new User("anas", "password_2",
                    Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"))
            ),
            new User("youness", "password_3",
                    Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"))
            ),new User("houssam", "password_4",
                    Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"))
            )
    )
    );



    private static List<String> tokens = new ArrayList<>();

    public static List<String> getTokens() {
        return tokens;
    }

    public static void setTokens(List<String> tokens) {
        UserDao.tokens = tokens;
    }

    public static List<UserDetails> getApplicationUsers() {
        return APPLICATION_USERS;
    }

    public static void setApplicationUsers(List<UserDetails> applicationUsers) {
        APPLICATION_USERS = applicationUsers;
    }

    public UserDetails findUserByEmail(String email){
        return APPLICATION_USERS
                .stream()
                .filter(u -> u.getUsername().equals(email))
                .findFirst()
                .orElseThrow(() -> new UsernameNotFoundException("No user was found"));
    }
}
