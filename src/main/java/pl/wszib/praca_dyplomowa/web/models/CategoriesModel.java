package pl.wszib.praca_dyplomowa.web.models;

public class CategoriesModel {

    private Long id;
    private String category;

    public CategoriesModel() {
    }

    public CategoriesModel(Long id, String category) {
        this.id = id;
        this.category = category;
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


}
