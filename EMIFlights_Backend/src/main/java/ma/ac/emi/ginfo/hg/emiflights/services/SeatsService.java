package ma.ac.emi.ginfo.hg.emiflights.services;

import ma.ac.emi.ginfo.hg.emiflights.entities.Plane;
import ma.ac.emi.ginfo.hg.emiflights.entities.Seats;
import ma.ac.emi.ginfo.hg.emiflights.entities.ref.Class;
import ma.ac.emi.ginfo.hg.emiflights.exception.PlaneNotFoundException;
import ma.ac.emi.ginfo.hg.emiflights.exception.SeatsNotFoundException;
import ma.ac.emi.ginfo.hg.emiflights.repositories.ClassRepository;
import ma.ac.emi.ginfo.hg.emiflights.repositories.PlaneRepository;
import ma.ac.emi.ginfo.hg.emiflights.repositories.SeatsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class SeatsService {
    private final SeatsRepository seatsRepository;
    private final PlaneRepository planeRepository;
    private final ClassRepository classRepository;

    @Autowired
    public SeatsService(SeatsRepository seatsRepository, PlaneRepository planeRepository, ClassRepository classRepository) {
        this.seatsRepository = seatsRepository;
        this.planeRepository = planeRepository;
        this.classRepository = classRepository;
    }

    public Seats addSeats(Seats seats) {
        Class _class = classRepository.findClassByCode(seats.getSeatClass().getCode())
                .orElseThrow(() -> new SeatsNotFoundException("Class by code " + seats.getSeatClass().getCode() + " was not found"));
        seats.setSeatClass(_class);

        Plane plane = planeRepository.findPlaneById(seats.getPlane().getId())
                .orElseThrow(() -> new PlaneNotFoundException("Plane by id " + seats.getPlane().getId() + " was not found"));
        seats.setPlane(plane);

        return seatsRepository.save(seats);
    }

    public List<Seats> findAllSeats() {
        return seatsRepository.findAll();
    }

    public Seats updateSeats(Seats seats) {
        Seats seatsSearched = seatsRepository.findSeatsById(seats.getId())
                .orElseThrow(() -> new SeatsNotFoundException("Seats by id " + seats.getId() + " was not found"));

        Class _class = classRepository.findClassByCode(seats.getSeatClass().getCode())
                .orElseThrow(() -> new SeatsNotFoundException("Class by code " + seats.getSeatClass().getCode() + " was not found"));
        seats.setSeatClass(_class);

        Plane plane = planeRepository.findPlaneById(seats.getPlane().getId())
                .orElseThrow(() -> new PlaneNotFoundException("Plane by id " + seats.getPlane().getId() + " was not found"));
        seats.setPlane(plane);
        return seatsRepository.save(seats);
    }

    public Seats findSeatsById(UUID id) {
        return seatsRepository.findSeatsById(id)
                .orElseThrow(() -> new SeatsNotFoundException("Seats by id " + id + " was not found"));
    }

    public void deleteSeats(UUID id) {
        seatsRepository.deleteSeatsById(id);
    }

    public int getNumberOfSeats(UUID planeId, String seatClassCode) {
        return seatsRepository.findByPlane_IdAndSeatClass_Code(planeId, seatClassCode).getNumberOfSeats();
    }
}
