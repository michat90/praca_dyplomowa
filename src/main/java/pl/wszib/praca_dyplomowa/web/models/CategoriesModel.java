package pl.wszib.praca_dyplomowa.web.models;

import jakarta.persistence.Column;

public class CategoriesModel {

    private Long id;
    private String category;

    private String color;

    private String operationType;

    private String userName;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public CategoriesModel() {
    }

    public CategoriesModel(Long id, String category, String color, String operationType, String userName) {
        this.id = id;
        this.category = category;
        this.color = color;
        this.operationType = operationType;
        this.userName = userName;
    }

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
