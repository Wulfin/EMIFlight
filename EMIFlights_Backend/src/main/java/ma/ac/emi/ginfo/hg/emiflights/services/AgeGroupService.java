package ma.ac.emi.ginfo.hg.emiflights.services;

import ma.ac.emi.ginfo.hg.emiflights.entities.ref.AgeGroup;
import ma.ac.emi.ginfo.hg.emiflights.entities.ref.Class;
import ma.ac.emi.ginfo.hg.emiflights.exception.ClassNotFoundException;
import ma.ac.emi.ginfo.hg.emiflights.repositories.AgeGroupRepository;
import ma.ac.emi.ginfo.hg.emiflights.repositories.ClassRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgeGroupService {
    private final AgeGroupRepository ageGroupRepository;

    public AgeGroupService(AgeGroupRepository ageGroupRepository) {
        this.ageGroupRepository = ageGroupRepository;
    }

    public AgeGroup addAgeGroup(AgeGroup ageGroup) {
        return ageGroupRepository.save(ageGroup);
    }

    public List<AgeGroup> findAllAgeGroups() {
        return ageGroupRepository.findAll();
    }

    public AgeGroup updateAgeGroup(AgeGroup ageGroup) {
        return ageGroupRepository.save(ageGroup);
    }

    public AgeGroup findAgeGroupByCode(String code) {
        return ageGroupRepository.findAgeGroupByCode(code)
                .orElseThrow(() -> new ClassNotFoundException("AgeGroup by code " + code + "was not found"));
    }

    public void deleteAgeGroupByCode(String code) {
        ageGroupRepository.deleteAgeGroupByCode(code);
    }
}
