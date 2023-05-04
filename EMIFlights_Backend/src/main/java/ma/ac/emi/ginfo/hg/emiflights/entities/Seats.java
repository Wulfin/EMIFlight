package ma.ac.emi.ginfo.hg.emiflights.entities;

import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ma.ac.emi.ginfo.hg.emiflights.entities.ref.Class;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Seats implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(cascade = CascadeType.ALL)
    private Plane plane;

    @ManyToOne
    @Nonnull
    private Class seatClass;

    private int numberOfSeats;

    public Seats(Plane plane, Class seatClass, int numberOfSeats) {
        this.plane = plane;
        this.seatClass = seatClass;
        this.numberOfSeats = numberOfSeats;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Seats Seats = (Seats) o;
        return id != null && Objects.equals(id, Seats.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
