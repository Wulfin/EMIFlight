package ma.ac.emi.ginfo.hg.emiflights.restcontrollers;

import ma.ac.emi.ginfo.hg.emiflights.entities.Airport;
import ma.ac.emi.ginfo.hg.emiflights.services.AirportService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/airport")
public class AirportController {
    private final AirportService airportService;

    public AirportController(AirportService airportService) {
        this.airportService = airportService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Airport>> getAllAirports() {
        List<Airport> airports = airportService.findAllAirports();
        return new ResponseEntity<>(airports, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Airport> addAirport(@RequestBody Airport airport) {
        Airport newAirport = airportService.addAirport(airport);
        return new ResponseEntity<>(newAirport, HttpStatus.CREATED);
    }

    @GetMapping("/find/{code}")
    public ResponseEntity<Airport> getAirportByCode(@PathVariable String code) {
        Airport airport = airportService.findAirportByCode(code);
        return new ResponseEntity<>(airport, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Airport> updateAirport(@RequestBody Airport airport) {
        Airport updatedAirport = airportService.updateAirport(airport);
        return new ResponseEntity<>(updatedAirport, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{code}")
    public ResponseEntity<?> deleteAirport(@PathVariable("code") String code) {
        airportService.deleteAirport(code);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}