package ma.ac.emi.ginfo.hg.emiflights.restcontrollers;

import ma.ac.emi.ginfo.hg.emiflights.entities.Seats;
import ma.ac.emi.ginfo.hg.emiflights.services.SeatsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/seats")
public class SeatsController {
    private final SeatsService seatsService;

    public SeatsController(SeatsService seatsService) {
        this.seatsService = seatsService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Seats>> getAllSeats() {
        List<Seats> seats = seatsService.findAllSeats();
        return new ResponseEntity<>(seats, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Seats> addSeats(@RequestBody Seats seats) {
        Seats newSeats = seatsService.addSeats(seats);
        return new ResponseEntity<>(newSeats, HttpStatus.CREATED);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Seats> getSeatsById(@PathVariable UUID id) {
        Seats seats = seatsService.findSeatsById(id);
        return new ResponseEntity<>(seats, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Seats> updateSeats(@RequestBody Seats seats) {
        Seats updatedSeats = seatsService.updateSeats(seats);
        return new ResponseEntity<>(updatedSeats, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSeats(@PathVariable("id") UUID id) {
        seatsService.deleteSeats(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/get-number-of-seats/{planeId}/{seatClassCode}")
    public ResponseEntity<Integer> getNumberOfSeats(@PathVariable UUID planeId, @PathVariable String seatClassCode) {
        int nbOfSeats = seatsService.getNumberOfSeats(planeId, seatClassCode);
        return new ResponseEntity<>(nbOfSeats, HttpStatus.OK) ;
    }
}

