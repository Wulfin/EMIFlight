package ma.ac.emi.ginfo.hg.emiflights.repositories;

import jakarta.transaction.Transactional;
import ma.ac.emi.ginfo.hg.emiflights.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    @Transactional
    void deleteUserById(UUID id);

    Optional<User> findUserByUsername(String username);

    @Query("select u from User u where u.username = ?1 and u.password = ?2")
    Optional<User> findByUsernameAndPassword(String username, String password);

    Optional<User> findUserByPassword(String password);

    Optional<User> findUserByEmail(String email);

    Optional<User> findUserByBirthDate(LocalDate birthDate);

    Optional<User> findUserByFirstName(String firstName);

    Optional<User> findUserByLastName(String lastName);

    Optional<User> findUserByAdress(String address);
}