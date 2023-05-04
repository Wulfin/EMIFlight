package ma.ac.emi.ginfo.hg.emiflights.entities;

import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Airport implements Serializable {
    @Id
    @Column(length = 20)
    private String code;

    @Nonnull
    private String label;

    @Nonnull
    private String city;

    @Nonnull
    private String country;

    public Airport(String code, String label, String city, String country) {
        this.code = code;
        this.label = label;
        this.city = city;
        this.country = country;
    }
}
