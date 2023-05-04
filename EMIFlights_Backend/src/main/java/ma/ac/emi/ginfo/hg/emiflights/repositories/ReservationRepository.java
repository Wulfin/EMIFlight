package ma.ac.emi.ginfo.hg.emiflights.repositories;

import jakarta.transaction.Transactional;
import ma.ac.emi.ginfo.hg.emiflights.entities.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ReservationRepository extends JpaRepository<Reservation, UUID> {
    Optional<Reservation> findReservationById(UUID id);

    @Transactional
    void deleteReservationById(UUID id);

    Optional<Reservation> findReservationByCode(String code);

    @Query("select r from Reservation r where r.flight.id = ?1 and r.seatClass.code = ?2")
    List<Reservation> findByFlight_IdAndSeatClass_Code(UUID id, String code);

    @Query("select r from Reservation r where r.user.id = ?1")
    List<Reservation> findByUserId(UUID id);


}