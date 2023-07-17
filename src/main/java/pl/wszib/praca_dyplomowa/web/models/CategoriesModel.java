package pl.wszib.praca_dyplomowa.web.models;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

public class CategoriesModel {

    private Long id;
    private String category;
    private String subCategory;

    public CategoriesModel() {
    }

    public CategoriesModel(Long id, String category, String subCategory) {
        this.id = id;
        this.category = category;
        this.subCategory = subCategory;
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

    public String getSubCategory() {
        return subCategory;
    }

    public void setSubCategory(String subCategory) {
        this.subCategory = subCategory;
    }
}
