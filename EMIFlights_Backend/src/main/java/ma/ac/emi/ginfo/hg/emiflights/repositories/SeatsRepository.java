package ma.ac.emi.ginfo.hg.emiflights.repositories;

import jakarta.transaction.Transactional;
import ma.ac.emi.ginfo.hg.emiflights.entities.Seats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SeatsRepository extends JpaRepository<Seats, UUID> {
    Optional<Seats> findSeatsById(UUID id);
    @Transactional
    void deleteSeatsById(UUID id);
    List<Seats> findSeatsByPlane_Id(UUID id);

    @Query("select s from Seats s where s.seatClass.code = ?1")
    List<Seats> findBySeatClass_Code(String code);

    @Query("select s from Seats s where s.plane.id = ?1 and s.seatClass.code = ?2")
    Seats findByPlane_IdAndSeatClass_Code(UUID id, String code);

}
