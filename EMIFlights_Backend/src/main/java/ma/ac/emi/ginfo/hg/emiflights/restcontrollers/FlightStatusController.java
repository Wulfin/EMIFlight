package ma.ac.emi.ginfo.hg.emiflights.restcontrollers;

import ma.ac.emi.ginfo.hg.emiflights.entities.ref.FlightStatus;
import ma.ac.emi.ginfo.hg.emiflights.services.FlightStatusService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/flightstatus")
public class FlightStatusController {
    private final FlightStatusService flightStatusService;

    public FlightStatusController(FlightStatusService flightStatusService) {
        this.flightStatusService = flightStatusService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<FlightStatus>> getAllFlightStatus() {
        List<FlightStatus> flightStatus = flightStatusService.findAllFlightStatuss();
        return new ResponseEntity<>(flightStatus, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<FlightStatus> addFlightStatus(@RequestBody FlightStatus flightStatus) {
        FlightStatus newFlightStatus = flightStatusService.addFlightStatus(flightStatus);
        return new ResponseEntity<>(newFlightStatus, HttpStatus.CREATED);
    }

    @GetMapping("/find/{code}")
    public ResponseEntity<FlightStatus> getFlightStatusByCode(@PathVariable String code) {
        FlightStatus flightStatus = flightStatusService.findFlightStatusByCode(code);
        return new ResponseEntity<>(flightStatus, HttpStatus.OK);
    }
}