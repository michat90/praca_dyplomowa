package pl.wszib.praca_dyplomowa.services;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.wszib.praca_dyplomowa.data.entities.CategoryEntity;
import pl.wszib.praca_dyplomowa.data.entities.SubcategoryEntity;
import pl.wszib.praca_dyplomowa.data.repositories.CategoriesRepositories;
import pl.wszib.praca_dyplomowa.data.repositories.SubcategoriesRepositories;
import pl.wszib.praca_dyplomowa.web.mappers.SubcategoriesMapper;
import pl.wszib.praca_dyplomowa.web.models.MyUserDetails;
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



//    public List<SubcategoriesModel> findAll() {
//        final var entities = subcategoriesRepositories.findAll();
//
//        return entities.stream()
//                .map(SubcategoriesMapper::toModel)
//                .toList();
//    }



    @Transactional
    public Long saveSubcategories(Long categoryId, SubcategoriesModel subcategoriesModel) {
        CategoryEntity categoryEntity = getCategoryById(categoryId);
        SubcategoryEntity subcategoryEntity = new SubcategoryEntity();
        subcategoryEntity.setUserName(getAuthenticatedUser());
        subcategoryEntity.setSubCategory(subcategoriesModel.getSubCategory());
        subcategoryEntity.setOperationType(subcategoriesModel.getOperationType());
        subcategoryEntity.setCategoryEntity(categoryEntity);
        subcategoryEntity.setColor(subcategoriesModel.getColor());

        final var saveSubcategories = subcategoriesRepositories.save(subcategoryEntity);

        return saveSubcategories.getId();
    }

    public List<SubcategoriesModel> listAll () {
        List<SubcategoryEntity> subcategoryEntities = subcategoriesRepositories.listAll(getAuthenticatedUser());

        return  subcategoryEntities.stream()
                .map(SubcategoriesMapper::toModel)
                .toList();
    }

    public SubcategoryEntity getById (Long subcategoryId) {

        return subcategoriesRepositories.findById(subcategoryId)
                .orElseThrow(
                        EntityNotFoundException::new);
    }
    @Transactional
    public void editSubcategory(Long categoryId, Long subCategoryId, SubcategoriesModel subcategoriesModel) {
        SubcategoryEntity subcategoryEntity = subcategoriesRepositories.findById(subCategoryId)
                .orElseThrow(
                        EntityNotFoundException::new);
        CategoryEntity categoryEntity = getCategoryById(categoryId);

        subcategoryEntity.setSubCategory(subcategoriesModel.getSubCategory());
        subcategoryEntity.setOperationType(subcategoriesModel.getOperationType());
        subcategoryEntity.setCategoryEntity(categoryEntity);
        subcategoryEntity.setColor(subcategoriesModel.getColor());
        subcategoriesRepositories.save(subcategoryEntity);
    }

    public CategoryEntity getCategoryById (Long categoryId) {

        return categoriesRepositories.findById(categoryId)
                .orElseThrow(
                        EntityNotFoundException::new);
    }

    @Transactional
    public void deleteById(Long subcategoryId) {
        subcategoriesRepositories.deleteById(subcategoryId);
    }


    public String getAuthenticatedUser() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

}
