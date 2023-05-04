package ma.ac.emi.ginfo.hg.emiflights.entities.ref;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import java.io.Serializable;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Day implements Serializable {
    @Id
    @Column(length = 5)
    private String code;

    @Nonnull
    private String label;

}