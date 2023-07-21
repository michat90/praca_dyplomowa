package pl.wszib.praca_dyplomowa.data.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.wszib.praca_dyplomowa.data.entities.CategoryEntity;
import pl.wszib.praca_dyplomowa.data.entities.SubcategoryEntity;

public interface CategoriesRepositories extends JpaRepository<CategoryEntity, Long> {
}
