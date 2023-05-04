package ma.ac.emi.ginfo.hg.emiflights.services;

import ma.ac.emi.ginfo.hg.emiflights.entities.Airport;
import ma.ac.emi.ginfo.hg.emiflights.entities.Terminal;
import ma.ac.emi.ginfo.hg.emiflights.exception.AirportNotFoundException;
import ma.ac.emi.ginfo.hg.emiflights.repositories.AirportRepository;
import ma.ac.emi.ginfo.hg.emiflights.repositories.TerminalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AirportService {
    private final AirportRepository airportRepository;
    private final TerminalRepository terminalRepository;

    @Autowired
    public AirportService(AirportRepository airportRepository, TerminalRepository terminalRepository) {
        this.airportRepository = airportRepository;
        this.terminalRepository = terminalRepository;
    }

    public Airport addAirport(Airport airport) {
        return airportRepository.save(airport);
    }

    public List<Airport> findAllAirports() {
        return airportRepository.findAll();
    }

    public Airport updateAirport(Airport airport) {
        Airport airportSearched = airportRepository.findAirportByCode(airport.getCode())
                .orElseThrow(() -> new AirportNotFoundException("Airport by code " + airport.getCode() + " was not found"));
        return airportRepository.save(airport);
    }

    public Airport findAirportByCode(String code) {
        return airportRepository.findAirportByCode(code)
                .orElseThrow(() -> new AirportNotFoundException("Airport by code " + code + " was not found"));
    }

    public void deleteAirport(String code) {
        List<Terminal> terminals = terminalRepository.findTerminalsByAirport_Code(code);
        for(Terminal terminal : terminals) {
            terminalRepository.deleteTerminalByCode(terminal.getCode());
        }
        airportRepository.deleteAirportByCode(code);
    }
}
