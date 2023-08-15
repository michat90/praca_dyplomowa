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

    @Column(name = "color")
    private String color;

    @Column(name = "operation_type")
    private String operationType;



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

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getOperationType() {
        return operationType;
    }

    public void setOperationType(String operationType) {
        this.operationType = operationType;
    }
}
