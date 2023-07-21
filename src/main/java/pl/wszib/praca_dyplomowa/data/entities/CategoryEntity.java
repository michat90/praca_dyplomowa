package pl.wszib.praca_dyplomowa.data.entities;

import jakarta.persistence.*;


@Entity
@Table(name = "Categories")
public class CategoryEntity {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;
    @Column(name = "category")
    private String category;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

}
