package ma.ac.emi.ginfo.hg.emiflights.services;

import ma.ac.emi.ginfo.hg.emiflights.entities.User;
import ma.ac.emi.ginfo.hg.emiflights.exception.UserNotFoundException;
import ma.ac.emi.ginfo.hg.emiflights.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;


    @Autowired
    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public void deleteUser(UUID id) {
        userRepository.deleteUserById(id);
    }

    public User addUser(User user) {
        return userRepository.save(user);
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public User findUserById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
    }

    public User findUserByUsername(String username) {
        return userRepository.findUserByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User by username " + username + " was not found"));
    }

    public User findUserByCredentials(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password)
                .orElseThrow(() -> new UserNotFoundException("User by username " + username + " was not found"));
    }

    public User modifyUserFirstName(User user, String firstName){
        user.setFirstName(firstName);
        userRepository.save(user);
        return user;
    }

    public User modifyUserLastName(User user, String lastName){
        user.setLastName(lastName);
        userRepository.save(user);
        return user;
    }

    public User modifyUserEmail(User user, String email){
        user.setEmail(email);
        userRepository.save(user);
        return user;
    }

    public User modifyUserBirthDate(User user, LocalDate birthDate){
        user.setBirthDate(birthDate);
        userRepository.save(user);
        return user;
    }

    public User modifyUserUsername(User user, String username){
        user.setUsername(username);
        userRepository.save(user);
        return user;
    }

    public User modifyUserPassword(User user, String password){
        user.setPassword(password);
        userRepository.save(user);
        return user;
    }
}
