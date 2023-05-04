package ma.ac.emi.ginfo.hg.emiflights.exception;

public class PlaneNotFoundException extends RuntimeException {
    public PlaneNotFoundException(String message) {
        super(message);
    }
}
