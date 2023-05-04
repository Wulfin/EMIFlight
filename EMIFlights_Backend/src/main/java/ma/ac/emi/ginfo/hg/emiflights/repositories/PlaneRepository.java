package ma.ac.emi.ginfo.hg.emiflights.repositories;

import jakarta.transaction.Transactional;
import ma.ac.emi.ginfo.hg.emiflights.entities.Plane;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PlaneRepository extends JpaRepository<Plane, UUID> {
    Optional<Plane> findPlaneById(UUID id);
    @Transactional
    void deletePlaneById(UUID id);
}