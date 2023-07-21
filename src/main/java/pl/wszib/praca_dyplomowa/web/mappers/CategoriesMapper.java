package pl.wszib.praca_dyplomowa.web.mappers;

import pl.wszib.praca_dyplomowa.data.entities.CategoryEntity;
import pl.wszib.praca_dyplomowa.data.entities.SubcategoryEntity;
import pl.wszib.praca_dyplomowa.web.models.CategoriesModel;
import pl.wszib.praca_dyplomowa.web.models.SubcategoriesModel;

public class CategoriesMapper {
    public static CategoriesModel toModel(CategoryEntity entity) {
        return new CategoriesModel(entity.getId(), entity.getCategory());
    }

    public static CategoryEntity toEntity(CategoriesModel model) {
        final var entity = new CategoryEntity();

        entity.setCategory(model.getCategory());
        return entity;
    }
}
