package pl.wszib.praca_dyplomowa.web.mappers;

import pl.wszib.praca_dyplomowa.data.entities.SubcategoryEntity;
import pl.wszib.praca_dyplomowa.web.models.SubcategoriesModel;

public class SubcategoriesMapper {
    public static SubcategoriesModel toModel(SubcategoryEntity entity) {
        return new SubcategoriesModel(entity.getId(), entity.getCategoryEntity(), entity.getSubcategory());
    }

    public static SubcategoryEntity toEntity(SubcategoriesModel model) {
        final var entity = new SubcategoryEntity();

        entity.setCategoryEntity(model.getCategoryEntity());
        entity.setSubcategory(model.getSubCategory());
        return entity;
    }
}
