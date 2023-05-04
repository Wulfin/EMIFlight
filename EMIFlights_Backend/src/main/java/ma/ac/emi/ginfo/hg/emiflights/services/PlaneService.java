package ma.ac.emi.ginfo.hg.emiflights.services;

import ma.ac.emi.ginfo.hg.emiflights.entities.Plane;
import ma.ac.emi.ginfo.hg.emiflights.entities.Seats;
import ma.ac.emi.ginfo.hg.emiflights.exception.PlaneNotFoundException;
import ma.ac.emi.ginfo.hg.emiflights.repositories.SeatsRepository;
import ma.ac.emi.ginfo.hg.emiflights.repositories.PlaneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PlaneService {
    private final PlaneRepository planeRepository;
    private final SeatsRepository seatsRepository;

    @Autowired
    public PlaneService(PlaneRepository planeRepository, SeatsRepository seatsRepository) {
        this.planeRepository = planeRepository;
        this.seatsRepository = seatsRepository;
    }

    public Plane addPlane(Plane plane) {
        return planeRepository.save(plane);
    }

    public List<Plane> findAllPlanes() {
        return planeRepository.findAll();
    }

    public Plane updatePlane(Plane plane) {
        Plane planeSearched = planeRepository.findPlaneById(plane.getId())
                .orElseThrow(() -> new PlaneNotFoundException("Plane by id " + plane.getId() + " was not found"));
        return planeRepository.save(plane);
    }

    public Plane findPlaneById(UUID id) {
        return planeRepository.findPlaneById(id)
                .orElseThrow(() -> new PlaneNotFoundException("Plane by id " + id + " was not found"));
    }

    public void deletePlane(UUID id) {
        List<Seats> seats = seatsRepository.findSeatsByPlane_Id(id);
        for(Seats seat : seats) {
            seatsRepository.deleteSeatsById(seat.getId());
        }
        planeRepository.deletePlaneById(id);
    }
}
