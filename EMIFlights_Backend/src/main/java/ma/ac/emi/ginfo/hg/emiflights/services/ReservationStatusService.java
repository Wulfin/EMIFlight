package ma.ac.emi.ginfo.hg.emiflights.services;

import ma.ac.emi.ginfo.hg.emiflights.entities.ref.ReservationStatus;
import ma.ac.emi.ginfo.hg.emiflights.exception.ClassNotFoundException;
import ma.ac.emi.ginfo.hg.emiflights.repositories.ReservationStatusRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationStatusService  {
    private final ReservationStatusRepository reservationStatusRepository;

    public ReservationStatusService(ReservationStatusRepository reservationStatusRepository) {
        this.reservationStatusRepository = reservationStatusRepository;
    }

    public ReservationStatus addReservationStatus(ReservationStatus reservationStatus) {
        return reservationStatusRepository.save(reservationStatus);
    }

    public List<ReservationStatus> findAllReservationStatuses() {
        return reservationStatusRepository.findAll();
    }

    public ReservationStatus updateReservationStatus(ReservationStatus ReservationStatus) {
        return reservationStatusRepository.save(ReservationStatus);
    }

    public ReservationStatus findReservationStatusByCode(String code) {
        return reservationStatusRepository.findReservationStatusByCode(code)
                .orElseThrow(() -> new ClassNotFoundException("ReservationStatus by code " + code + "was not found"));
    }

    public void deleteReservationStatus(String code) {
        reservationStatusRepository.deleteReservationStatusByCode(code);
    }
}