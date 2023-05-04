package ma.ac.emi.ginfo.hg.emiflights.entities;

import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.io.Serializable;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Terminal implements Serializable {
    @Id
    @Column(length = 20)
    private String code;

    @Nonnull
    private String label;

    @ManyToOne(cascade = CascadeType.ALL)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Airport airport;

    public Terminal(String code, String label, Airport airport) {
        this.code = code;
        this.label = label;
        this.airport = airport;
    }
}
