package ma.ac.emi.ginfo.hg.emiflights.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ma.ac.emi.ginfo.hg.emiflights.entities.ref.Day;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class FlightGeneric implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne
    private Airport departureAirport;

    @OneToOne
    private Airport arrivalAirport;

    @Temporal(TemporalType.TIME)
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="HH:mm")
    private Date departureHour;
    @Temporal(TemporalType.TIME)
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="HH:mm")
    private Date arrivalHour;

    private BigDecimal basePrice;

    @ManyToOne
    private Day day;

    @ManyToOne
    private Plane plane;

    @OneToOne
    private Terminal departureTerminal;

    @OneToOne
    private Terminal arrivalTerminal;

    public FlightGeneric(Airport departureAirport, Airport arrivalAirport, Date departureHour, Date arrivalHour, BigDecimal basePrice, Day day, Plane plane, Terminal departureTerminal, Terminal arrivalTerminal) {
        this.departureAirport = departureAirport;
        this.arrivalAirport = arrivalAirport;
        this.departureHour = departureHour;
        this.arrivalHour = arrivalHour;
        this.basePrice = basePrice;
        this.day = day;
        this.plane = plane;
        this.departureTerminal = departureTerminal;
        this.arrivalTerminal = arrivalTerminal;
    }
}
