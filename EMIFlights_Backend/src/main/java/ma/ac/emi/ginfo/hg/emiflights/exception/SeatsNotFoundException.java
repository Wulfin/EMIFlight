package ma.ac.emi.ginfo.hg.emiflights.exception;

public class SeatsNotFoundException extends RuntimeException {
    public SeatsNotFoundException(String message) {
        super(message);
    }
}
