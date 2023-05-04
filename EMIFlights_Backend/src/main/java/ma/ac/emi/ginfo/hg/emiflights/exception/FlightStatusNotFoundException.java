package ma.ac.emi.ginfo.hg.emiflights.exception;

public class FlightStatusNotFoundException extends RuntimeException {
    public FlightStatusNotFoundException(String message) {
        super(message);
    }
}
