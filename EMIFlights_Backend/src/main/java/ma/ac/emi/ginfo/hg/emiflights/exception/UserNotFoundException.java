package ma.ac.emi.ginfo.hg.emiflights.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String message) {
        super(message);
    }
}
