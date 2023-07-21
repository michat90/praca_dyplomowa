package pl.wszib.praca_dyplomowa.web.models;

import pl.wszib.praca_dyplomowa.data.entities.CategoryEntity;

public class SubcategoriesModel {

    private Long id;
    private CategoryEntity categoryEntity;
    private String subCategory;


    public SubcategoriesModel() {
    }

    public SubcategoriesModel(Long id, CategoryEntity categoryEntity, String subCategory) {
        this.id = id;
        this.categoryEntity = categoryEntity;
        this.subCategory = subCategory;
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
}
