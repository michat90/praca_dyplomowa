package pl.wszib.praca_dyplomowa.services;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.wszib.praca_dyplomowa.data.entities.CategoryEntity;
import pl.wszib.praca_dyplomowa.data.entities.SubcategoryEntity;
import pl.wszib.praca_dyplomowa.data.repositories.CategoriesRepositories;
import pl.wszib.praca_dyplomowa.data.repositories.SubcategoriesRepositories;
import pl.wszib.praca_dyplomowa.web.mappers.SubcategoriesMapper;
import pl.wszib.praca_dyplomowa.web.models.SubcategoriesModel;

import java.util.List;

@Service
public class SubcategoriesService {

    private final SubcategoriesRepositories subcategoriesRepositories;
    private final CategoriesRepositories categoriesRepositories;

    public SubcategoriesService(SubcategoriesRepositories subcategoriesRepositories, CategoriesRepositories categoriesRepositories) {
        this.subcategoriesRepositories = subcategoriesRepositories;
        this.categoriesRepositories = categoriesRepositories;
    }



    public List<SubcategoriesModel> findAll() {
        final var entities = subcategoriesRepositories.findAll();

        return entities.stream()
                .map(SubcategoriesMapper::toModel)
                .toList();
    }



    @Transactional
    public Long saveSubcategories(Long categoryId, SubcategoriesModel subcategoriesModel) {
        CategoryEntity categoryEntity = categoriesRepositories.findById(categoryId)
                .orElseThrow(
                        EntityNotFoundException::new);
        System.out.println(subcategoriesModel.getSubCategory());
        SubcategoryEntity subcategoryEntity = new SubcategoryEntity();
        subcategoryEntity.setSubCategory(subcategoriesModel.getSubCategory());
        subcategoryEntity.setOperationType(subcategoriesModel.getOperationType());
        subcategoryEntity.setCategoryEntity(categoryEntity);
        subcategoryEntity.setColor(subcategoriesModel.getColor());

        final var saveSubcategories = subcategoriesRepositories.save(subcategoryEntity);

        return saveSubcategories.getId();
    }

    public List<SubcategoryEntity> listAll () {
        return subcategoriesRepositories.listAll();
    }
}
