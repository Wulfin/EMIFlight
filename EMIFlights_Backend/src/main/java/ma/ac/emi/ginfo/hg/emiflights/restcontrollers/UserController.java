package ma.ac.emi.ginfo.hg.emiflights.restcontrollers;

import ma.ac.emi.ginfo.hg.emiflights.authentication.config.UserDao;
import ma.ac.emi.ginfo.hg.emiflights.entities.User;
import ma.ac.emi.ginfo.hg.emiflights.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    private final UserDao userDao;

    public UserController(UserService userService, UserDao userDao) {
        this.userService = userService;
        this.userDao = userDao;
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/findByCre/{username}/{password}")
    public ResponseEntity<User> findUserByCre(@PathVariable("username") String username,
                                           @PathVariable("password") String password) {
        User user =  userService.findUserByCredentials(username, password);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") UUID id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        user.setAuthorities(Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")));
        User newUser = userService.addUser(user);
        List<UserDetails> appUsers = UserDao.getApplicationUsers();

        appUsers.add(new org.springframework.security.core.userdetails.User(
                user.getUsername(), user.getPassword(),
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"))
        ));

        UserDao.setApplicationUsers(appUsers);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PostMapping("/modify_fN")
    public ResponseEntity<User> modifyUserFirstName(@RequestBody User user,
                                                    @RequestParam("first_name") String firstName) {
        User newUser = userService.modifyUserFirstName(user, firstName);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PostMapping("/modify_lN")
    public ResponseEntity<User> modifyUserLastName(@RequestBody User user,
                                                    @RequestParam("last_name") String lastName) {
        User newUser = userService.modifyUserLastName(user, lastName);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PostMapping("/modify_email")
    public ResponseEntity<User> modifyUserEmail(@RequestBody User user,
                                                @RequestParam("email") String email) {
        User newUser = userService.modifyUserEmail(user, email);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PostMapping("/modify_adress")
    public ResponseEntity<User> modifyUserAdress(@RequestBody User user,
                                                @RequestParam("adress") String adress) {
        User newUser = userService.modifyUserEmail(user, adress);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PostMapping("/modify_birthd")
    public ResponseEntity<User> modifyUserBirthDate(@RequestBody User user,
                                                 @RequestParam("birth_date") LocalDate birthDate) {
        User newUser = userService.modifyUserBirthDate(user, birthDate);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }
}
