package ma.ac.emi.ginfo.hg.emiflights.repositories;

import jakarta.transaction.Transactional;
import ma.ac.emi.ginfo.hg.emiflights.entities.ref.Civility;
import ma.ac.emi.ginfo.hg.emiflights.entities.ref.Class;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CivilityRepository extends JpaRepository<Civility, String> {
    Optional<Civility> findCivilityByCode(String code);

    @Transactional
    void deleteCivilityByCode(String code);
}