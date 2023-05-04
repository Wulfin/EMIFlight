package ma.ac.emi.ginfo.hg.emiflights.restcontrollers;

import ma.ac.emi.ginfo.hg.emiflights.entities.FlightGeneric;
import ma.ac.emi.ginfo.hg.emiflights.services.FlightGenericService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/flightgeneric")
public class FlightGenericController {
    private final FlightGenericService flightGenericService;

    public FlightGenericController(FlightGenericService flightGenericService) {
        this.flightGenericService = flightGenericService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<FlightGeneric>> getAllFlightGenerics() {
        List<FlightGeneric> flightGenerics = flightGenericService.findAllFlightGenerics();
        return new ResponseEntity<>(flightGenerics, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<FlightGeneric> addFlightGeneric(@RequestBody FlightGeneric flightGeneric) {
        FlightGeneric newFlightGeneric = flightGenericService.addFlightGeneric(flightGeneric);
        return new ResponseEntity<>(newFlightGeneric, HttpStatus.CREATED);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<FlightGeneric> getFlightGenericById(@PathVariable UUID id) {
        FlightGeneric flightGeneric = flightGenericService.findFlightGenericById(id);
        return new ResponseEntity<>(flightGeneric, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<FlightGeneric> updateFlightGeneric(@RequestBody FlightGeneric flightGeneric) {
        FlightGeneric updatedFlightGeneric = flightGenericService.updateFlightGeneric(flightGeneric);
        return new ResponseEntity<>(updatedFlightGeneric, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteFlightGeneric(@PathVariable("id") UUID id) {
        flightGenericService.deleteFlightGeneric(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}