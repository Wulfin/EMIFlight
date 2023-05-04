package ma.ac.emi.ginfo.hg.emiflights.services;

import ma.ac.emi.ginfo.hg.emiflights.entities.Flight;
import ma.ac.emi.ginfo.hg.emiflights.entities.Reservation;
import ma.ac.emi.ginfo.hg.emiflights.entities.ref.AgeGroup;
import ma.ac.emi.ginfo.hg.emiflights.entities.ref.Civility;
import ma.ac.emi.ginfo.hg.emiflights.entities.ref.Class;
import ma.ac.emi.ginfo.hg.emiflights.entities.ref.ReservationStatus;
import ma.ac.emi.ginfo.hg.emiflights.exception.*;
import ma.ac.emi.ginfo.hg.emiflights.exception.ClassNotFoundException;
import ma.ac.emi.ginfo.hg.emiflights.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final FlightRepository flightRepository;
    private final CivilityRepository civilityRepository;
    private final AgeGroupRepository ageGroupRepository;
    private final ClassRepository classRepository;
    private final ReservationStatusRepository reservationStatusRepository;


    @Autowired
    public ReservationService(ReservationRepository reservationRepository, FlightRepository flightRepository, CivilityRepository civilityRepository, AgeGroupRepository ageGroupRepository, ClassRepository classRepository, ReservationStatusRepository reservationStatusRepository){
        this.reservationRepository = reservationRepository;
        this.flightRepository = flightRepository;
        this.civilityRepository = civilityRepository;
        this.ageGroupRepository = ageGroupRepository;
        this.classRepository = classRepository;
        this.reservationStatusRepository = reservationStatusRepository;
    }

    public List<Reservation> getReservationsByUser(UUID userId) {
        return reservationRepository.findByUserId(userId);
    }

    public Reservation addReservation(Reservation reservation) {

        Civility passengerCivility = civilityRepository.findCivilityByCode(reservation.getPassengerCivility().getCode())
                .orElseThrow(() -> new CivilityNotFoundException("Civility by code " + reservation.getPassengerCivility().getCode() + " was not found"));
        reservation.setPassengerCivility(passengerCivility);

        AgeGroup passengerAgeGroup = ageGroupRepository.findAgeGroupByCode(reservation.getPassengerAgeGroup().getCode())
                .orElseThrow(() -> new CivilityNotFoundException("AgeGroup by code " + reservation.getPassengerAgeGroup().getCode() + " was not found"));
        reservation.setPassengerAgeGroup(passengerAgeGroup);

        Class _class = classRepository.findClassByCode(reservation.getSeatClass().getCode())
                .orElseThrow(() -> new ClassNotFoundException("Class by code " + reservation.getSeatClass().getCode() + " was not found"));
        reservation.setSeatClass(_class);

        ReservationStatus reservationStatus = reservationStatusRepository.findReservationStatusByCode(reservation.getReservationStatus().getCode())
                .orElseThrow(() -> new ReservationStatusNotFoundException("Reservation by code " + reservation.getReservationStatus().getCode() + " was not found"));
        reservation.setReservationStatus(reservationStatus);

        Flight flight = flightRepository.findFlightById(reservation.getFlight().getId())
                .orElseThrow(() -> new FlightNotFoundException("Flight by id " + reservation.getFlight().getId() + " was not found"));
        reservation.setFlight(flight);

        return reservationRepository.save(reservation);
    }

    public List<Reservation> findAllReservations() {
        return reservationRepository.findAll();
    }

    public Reservation findReservationById(UUID id){
        return reservationRepository.findReservationById(id)
                .orElseThrow(() -> new ReservationNotFoundException("Reservation by id " + id + "was not found"));
    }

    public Reservation findReservationByCode(String code){
        return reservationRepository.findReservationByCode(code)
                .orElseThrow(() -> new ReservationNotFoundException("Reservation by code " + code + "was not found"));
    }

    public void deleteReservation(UUID id) {
        reservationRepository.deleteReservationById(id);
    }

    public Reservation modifyReservationSeat(String seatNumber, Reservation reservation){
        reservation.setSeatNumber(seatNumber);
        reservationRepository.save(reservation);
        return reservation;
    }

    public List<Reservation> getReservationsByFlightIdAndSeatClassCode(UUID flightId, String seatClassCode) {
        return reservationRepository.findByFlight_IdAndSeatClass_Code(flightId, seatClassCode);
    }

}
