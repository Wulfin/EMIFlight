package ma.ac.emi.ginfo.hg.emiflights.services;

import ma.ac.emi.ginfo.hg.emiflights.entities.Seats;
import ma.ac.emi.ginfo.hg.emiflights.entities.ref.Class;
import ma.ac.emi.ginfo.hg.emiflights.exception.ClassNotFoundException;
import ma.ac.emi.ginfo.hg.emiflights.repositories.ClassRepository;
import ma.ac.emi.ginfo.hg.emiflights.repositories.SeatsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassService {
    private final ClassRepository classRepository;
    private final SeatsRepository seatsRepository;
    public ClassService(ClassRepository classRepository, SeatsRepository seatsRepository) {
        this.classRepository = classRepository;
        this.seatsRepository = seatsRepository;
    }

    public Class addClass(Class _class) {
        return classRepository.save(_class);
    }

    public List<Class> findAllClasses() {
        return classRepository.findAll();
    }

    public Class updateClass(Class _class) {
        Class _classSearched = classRepository.findClassByCode(_class.getCode())
                .orElseThrow(() -> new ClassNotFoundException("Class by code " + _class.getCode() + " was not found"));
        return classRepository.save(_class);
    }

    public Class findClassByCode(String code) {
        return classRepository.findClassByCode(code)
                .orElseThrow(() -> new ClassNotFoundException("Class by code " + code + " was not found"));
    }

    public void deleteClassByCode(String code) {
        List<Seats> seats = seatsRepository.findBySeatClass_Code(code);
        for(Seats seat : seats) {
            seatsRepository.deleteSeatsById(seat.getId());
        }
        classRepository.deleteClassByCode(code);
    }
}
