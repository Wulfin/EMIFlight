package ma.ac.emi.ginfo.hg.emiflights.entities.ref;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FlightStatus implements Serializable {
    @Id
    @Column(length = 20)
    private String code;

    @Nonnull
    private String label;
}
