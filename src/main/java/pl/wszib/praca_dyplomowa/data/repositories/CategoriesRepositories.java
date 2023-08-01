package pl.wszib.praca_dyplomowa.data.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.w3c.dom.stylesheets.LinkStyle;
import pl.wszib.praca_dyplomowa.data.entities.CategoryEntity;
import pl.wszib.praca_dyplomowa.data.entities.SubcategoryEntity;
import pl.wszib.praca_dyplomowa.web.models.CategoriesModel;

import java.util.List;

public interface CategoriesRepositories extends JpaRepository<CategoryEntity, Long> {

    @Query("from CategoryEntity where category = :categoryName")
    public List<CategoryEntity> getCategoryByName (String categoryName);
}
