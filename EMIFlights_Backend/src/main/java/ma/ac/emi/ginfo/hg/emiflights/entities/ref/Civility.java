package ma.ac.emi.ginfo.hg.emiflights.entities.ref;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
public class Civility implements Serializable {
    @Id
    @Column(length = 20)
    private String code;

    private String label;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Civility civility = (Civility) o;
        return code != null && Objects.equals(code, civility.code);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
