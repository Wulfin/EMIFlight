package ma.ac.emi.ginfo.hg.emiflights.repositories;

import jakarta.transaction.Transactional;
import ma.ac.emi.ginfo.hg.emiflights.entities.ref.AgeGroup;
import ma.ac.emi.ginfo.hg.emiflights.entities.ref.Class;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AgeGroupRepository extends JpaRepository<AgeGroup, String> {
    Optional<AgeGroup> findAgeGroupByCode(String code);

    @Transactional
    void deleteAgeGroupByCode(String code);
}