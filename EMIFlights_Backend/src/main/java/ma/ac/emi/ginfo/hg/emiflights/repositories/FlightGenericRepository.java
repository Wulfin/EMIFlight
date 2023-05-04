package ma.ac.emi.ginfo.hg.emiflights.repositories;

import jakarta.transaction.Transactional;
import ma.ac.emi.ginfo.hg.emiflights.entities.FlightGeneric;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface FlightGenericRepository extends JpaRepository<FlightGeneric, UUID> {
    Optional<FlightGeneric> findFlightGenericById(UUID id);
    @Transactional
    void deleteFlightGenericById(UUID id);

}
