package ma.ac.emi.ginfo.hg.emiflights.services;

import ma.ac.emi.ginfo.hg.emiflights.entities.ref.Civility;
import ma.ac.emi.ginfo.hg.emiflights.exception.ClassNotFoundException;
import ma.ac.emi.ginfo.hg.emiflights.repositories.CivilityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CivilityService {
    private final CivilityRepository civilityRepository;

    public CivilityService(CivilityRepository civilityRepository) {
        this.civilityRepository = civilityRepository;
    }

    public Civility addCivility(Civility civility) {
        return civilityRepository.save(civility);
    }

    public List<Civility> findAllCivilities() {
        return civilityRepository.findAll();
    }

    public Civility updateCivility(Civility civility) {
        return civilityRepository.save(civility);
    }

    public Civility findClassByCode(String code) {
        return civilityRepository.findCivilityByCode(code)
                .orElseThrow(() -> new ClassNotFoundException("Civility by code " + code + "was not found"));
    }

    public void deleteCivilityByCode(String code) {
        civilityRepository.deleteCivilityByCode(code);
    }
}
