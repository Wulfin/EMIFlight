package ma.ac.emi.ginfo.hg.emiflights.repositories;

import jakarta.transaction.Transactional;
import ma.ac.emi.ginfo.hg.emiflights.entities.ref.Class;
import ma.ac.emi.ginfo.hg.emiflights.entities.ref.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReservationStatusRepository extends JpaRepository<ReservationStatus, String> {
    Optional<ReservationStatus> findReservationStatusByCode(String code);

    @Transactional
    void deleteReservationStatusByCode(String code);
}