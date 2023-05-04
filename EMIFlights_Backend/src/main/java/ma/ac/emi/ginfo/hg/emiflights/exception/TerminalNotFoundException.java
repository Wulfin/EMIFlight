package ma.ac.emi.ginfo.hg.emiflights.exception;

public class TerminalNotFoundException extends RuntimeException {
    public TerminalNotFoundException(String message) {
        super(message);
    }
}