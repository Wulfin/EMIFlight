package ma.ac.emi.ginfo.hg.emiflights.repositories;

import jakarta.transaction.Transactional;
import ma.ac.emi.ginfo.hg.emiflights.entities.ref.FlightStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FlightStatusRepository extends JpaRepository<FlightStatus, String> {
    Optional<FlightStatus> findFlightStatusByCode(String code);
    @Transactional
    void deleteFlightStatusByCode(String code);
}
