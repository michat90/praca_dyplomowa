package pl.wszib.praca_dyplomowa.web.models;

import jakarta.persistence.Column;
import pl.wszib.praca_dyplomowa.data.entities.CategoryEntity;

public class SubcategoriesModel {

    private Long id;
    private CategoryEntity categoryEntity;
    private String subCategory;
    private String color;
    private String operationType;
    private String userName;


    public SubcategoriesModel() {
    }

    public SubcategoriesModel(Long id, CategoryEntity categoryEntity, String subCategory, String color, String operationType, String userName) {
        this.id = id;
        this.categoryEntity = categoryEntity;
        this.subCategory = subCategory;
        this.color = color;
        this.operationType = operationType;
        this.userName = userName;
    }

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

    public CategoryEntity getCategoryEntity() {
        return categoryEntity;
    }

    public void setCategoryEntity(CategoryEntity categoryEntity) {
        this.categoryEntity = categoryEntity;
    }

    public String getSubCategory() {
        return subCategory;
    }

    public void setSubCategory(String subCategory) {
        this.subCategory = subCategory;
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
