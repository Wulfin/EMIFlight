package ma.ac.emi.ginfo.hg.emiflights.exception;

public class ReservationStatusNotFoundException extends RuntimeException {
    public ReservationStatusNotFoundException(String message) {
        super(message);
    }
}
