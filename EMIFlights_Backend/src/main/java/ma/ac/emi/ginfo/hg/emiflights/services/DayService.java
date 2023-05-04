package ma.ac.emi.ginfo.hg.emiflights.services;

import ma.ac.emi.ginfo.hg.emiflights.entities.ref.Day;
import ma.ac.emi.ginfo.hg.emiflights.exception.DayNotFoundException;
import ma.ac.emi.ginfo.hg.emiflights.repositories.DayRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DayService {
    private final DayRepository dayRepository;

    public DayService(DayRepository dayRepository) {
        this.dayRepository = dayRepository;
    }

    public Day addDay(Day day) {
        return dayRepository.save(day);
    }

    public List<Day> findAllDays() {
        return dayRepository.findAll();
    }

    public Day findDayByCode(String code) {
        return dayRepository.findDayByCode(code)
                .orElseThrow(() -> new DayNotFoundException("Day by code " + code + " was not found"));
    }
}
