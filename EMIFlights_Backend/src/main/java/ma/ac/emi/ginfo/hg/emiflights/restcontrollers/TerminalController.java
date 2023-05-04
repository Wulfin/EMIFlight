package ma.ac.emi.ginfo.hg.emiflights.restcontrollers;

import ma.ac.emi.ginfo.hg.emiflights.entities.Terminal;
import ma.ac.emi.ginfo.hg.emiflights.services.TerminalService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/terminal")
public class TerminalController {
    private final TerminalService terminalService;

    public TerminalController(TerminalService terminalService) {
        this.terminalService = terminalService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Terminal>> getAllTerminals() {
        List<Terminal> terminals = terminalService.findAllTerminals();
        return new ResponseEntity<>(terminals, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Terminal> addTerminal(@RequestBody Terminal terminal) {
        Terminal newTerminal = terminalService.addTerminal(terminal);
        return new ResponseEntity<>(newTerminal, HttpStatus.CREATED);
    }

    @GetMapping("/find/{code}")
    public ResponseEntity<Terminal> getTerminalByCode(@PathVariable String code) {
        Terminal terminal = terminalService.findTerminalByCode(code);
        return new ResponseEntity<>(terminal, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Terminal> updateTerminal(@RequestBody Terminal terminal) {
        Terminal updatedTerminal = terminalService.updateTerminal(terminal);
        return new ResponseEntity<>(updatedTerminal, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{code}")
    public ResponseEntity<?> deleteTerminal(@PathVariable("code") String code) {
        terminalService.deleteTerminal(code);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}