package pl.wszib.praca_dyplomowa.data.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;


@Entity
@Table(name = "Subcategories")
public class SubcategoryEntity {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;
    @Column(name = "subcategory")
    private String subCategory;
    @ManyToOne(fetch=FetchType.LAZY)
    @NotFound(
            action = NotFoundAction.IGNORE)
    @JoinColumn(name = "category_id")
    private CategoryEntity categoryEntity;

    @Column(name = "color")
    private String color;

    @Column(name = "operation_type")
    private String operationType;

    private String userName;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSubCategory() {
        return subCategory;
    }

    public void setSubCategory(String subcategory) {
        this.subCategory = subcategory;
    }

    public CategoryEntity getCategoryEntity() {
        return categoryEntity;
    }

    public void setCategoryEntity(CategoryEntity categoryEntity) {
        this.categoryEntity = categoryEntity;
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
