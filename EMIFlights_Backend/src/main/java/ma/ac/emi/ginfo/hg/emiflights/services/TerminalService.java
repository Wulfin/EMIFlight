package ma.ac.emi.ginfo.hg.emiflights.services;

import ma.ac.emi.ginfo.hg.emiflights.entities.Airport;
import ma.ac.emi.ginfo.hg.emiflights.entities.Terminal;
import ma.ac.emi.ginfo.hg.emiflights.exception.AirportNotFoundException;
import ma.ac.emi.ginfo.hg.emiflights.exception.TerminalNotFoundException;
import ma.ac.emi.ginfo.hg.emiflights.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TerminalService {
    private final TerminalRepository terminalRepository;
    private final AirportRepository airportRepository;

    @Autowired
    public TerminalService(TerminalRepository terminalRepository, AirportRepository airportRepository) {
        this.terminalRepository = terminalRepository;
        this.airportRepository = airportRepository;
    }

    public Terminal addTerminal(Terminal terminal) {
        Airport airport = airportRepository.findAirportByCode(terminal.getAirport().getCode())
                .orElseThrow(() -> new AirportNotFoundException("Airport by code " + terminal.getAirport().getCode() + " was not found"));
        terminal.setAirport(airport);
        return terminalRepository.save(terminal);
    }

    public List<Terminal> findAllTerminals() {
        return terminalRepository.findAll();
    }

    public Terminal updateTerminal(Terminal terminal) {
        Terminal terminalSearched = terminalRepository.findTerminalByCode(terminal.getCode())
                .orElseThrow(() -> new TerminalNotFoundException("Terminal by code " + terminal.getCode() + " was not found"));
        Airport airport = airportRepository.findAirportByCode(terminal.getAirport().getCode())
                .orElseThrow(() -> new AirportNotFoundException("Airport by code " + terminal.getAirport().getCode() + " was not found"));
        return terminalRepository.save(terminal);
    }

    public Terminal findTerminalByCode(String code) {
        return terminalRepository.findTerminalByCode(code)
                .orElseThrow(() -> new TerminalNotFoundException("Terminal by code " + code + " was not found"));
    }

    public void deleteTerminal(String code) {
        terminalRepository.deleteTerminalByCode(code);
    }
}