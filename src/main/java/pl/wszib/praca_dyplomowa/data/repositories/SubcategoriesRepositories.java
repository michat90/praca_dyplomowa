package pl.wszib.praca_dyplomowa.data.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.wszib.praca_dyplomowa.data.entities.SubcategoryEntity;

import java.util.List;

public interface SubcategoriesRepositories extends JpaRepository<SubcategoryEntity, Long> {
    @Query("from SubcategoryEntity WHERE userName = :userName ORDER BY categoryEntity ASC")
    public List<SubcategoryEntity> listAll(String userName);

}
