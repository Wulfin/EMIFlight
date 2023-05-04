package ma.ac.emi.ginfo.hg.emiflights.repositories;

import jakarta.transaction.Transactional;
import ma.ac.emi.ginfo.hg.emiflights.entities.Terminal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TerminalRepository extends JpaRepository<Terminal, String> {
    Optional<Terminal> findTerminalByCode(String code);
    @Transactional
    void deleteTerminalByCode(String code);
    List<Terminal> findTerminalsByAirport_Code(String code);
}
