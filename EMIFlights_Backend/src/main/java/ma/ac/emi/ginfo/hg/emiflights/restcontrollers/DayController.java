package ma.ac.emi.ginfo.hg.emiflights.restcontrollers;

import ma.ac.emi.ginfo.hg.emiflights.entities.ref.Day;
import ma.ac.emi.ginfo.hg.emiflights.services.DayService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/day")
public class DayController {
    private final DayService dayService;

    public DayController(DayService dayService) {
        this.dayService = dayService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Day>> getAllDay() {
        List<Day> day = dayService.findAllDays();
        return new ResponseEntity<>(day, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Day> addDay(@RequestBody Day day) {
        Day newDay = dayService.addDay(day);
        return new ResponseEntity<>(newDay, HttpStatus.CREATED);
    }

    @GetMapping("/find/{code}")
    public ResponseEntity<Day> getDayByCode(@PathVariable String code) {
        Day day = dayService.findDayByCode(code);
        return new ResponseEntity<>(day, HttpStatus.OK);
    }
}