package ma.ac.emi.ginfo.hg.emiflights.services;

import ma.ac.emi.ginfo.hg.emiflights.entities.ref.FlightStatus;
import ma.ac.emi.ginfo.hg.emiflights.exception.FlightStatusNotFoundException;
import ma.ac.emi.ginfo.hg.emiflights.repositories.FlightStatusRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlightStatusService {
    private final FlightStatusRepository flightStatusRepository;

    public FlightStatusService(FlightStatusRepository flightStatusRepository) {
        this.flightStatusRepository = flightStatusRepository;
    }

    public FlightStatus addFlightStatus(FlightStatus flightStatus) {
        return flightStatusRepository.save(flightStatus);
    }

    public List<FlightStatus> findAllFlightStatuss() {
        return flightStatusRepository.findAll();
    }

    public FlightStatus findFlightStatusByCode(String code) {
        return flightStatusRepository.findFlightStatusByCode(code)
                .orElseThrow(() -> new FlightStatusNotFoundException("FlightStatus by code " + code + " was not found"));
    }
}
