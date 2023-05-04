package ma.ac.emi.ginfo.hg.emiflights.entities;

import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import lombok.*;
import ma.ac.emi.ginfo.hg.emiflights.entities.ref.AgeGroup;
import ma.ac.emi.ginfo.hg.emiflights.entities.ref.Civility;
import ma.ac.emi.ginfo.hg.emiflights.entities.ref.Class;
import ma.ac.emi.ginfo.hg.emiflights.entities.ref.ReservationStatus;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;
import java.util.UUID;

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class Reservation implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Nonnull
    private String code;

    @ToString.Exclude
    @ManyToOne(optional = false)
    @JoinColumn(name = "flight_id", nullable = false)
    private Flight flight;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Temporal(TemporalType.DATE)
    @Nonnull
    private Date creationDate;

    @Temporal(TemporalType.DATE)
    @Nonnull
    private Date modificationDate;

    @Nonnull
    private String passengerLastName;

    @Nonnull
    private String passengerFirstName;

    @Nonnull
    @ManyToOne
    private Civility passengerCivility;

    @Nonnull
    @ManyToOne
    private AgeGroup passengerAgeGroup;

    @Nonnull
    @ManyToOne
    private Class seatClass;

    @Nonnull
    private String seatNumber;

    @Nonnull
    @ManyToOne
    private ReservationStatus reservationStatus;

    @Nonnull
    private double price;

    public Reservation(String code, Flight flight, User user, Date creationDate, Date modificationDate, String passengerLastName, String passengerFirstName, Civility passengerCivility, AgeGroup passengerAgeGroup, Class seatClass, String seatNumber, ReservationStatus reservationStatus, double price) {
        this.code = code;
        this.flight = flight;
        this.user = user;
        this.creationDate = creationDate;
        this.modificationDate = modificationDate;
        this.passengerLastName = passengerLastName;
        this.passengerFirstName = passengerFirstName;
        this.passengerCivility = passengerCivility;
        this.passengerAgeGroup = passengerAgeGroup;
        this.seatClass = seatClass;
        this.seatNumber = seatNumber;
        this.reservationStatus = reservationStatus;
        this.price = price;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Reservation that = (Reservation) o;
        return id != null && Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
