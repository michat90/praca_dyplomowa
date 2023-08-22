package pl.wszib.praca_dyplomowa.web.mappers;

import org.springframework.security.core.context.SecurityContextHolder;
import pl.wszib.praca_dyplomowa.data.entities.CategoryEntity;
import pl.wszib.praca_dyplomowa.data.entities.SubcategoryEntity;
import pl.wszib.praca_dyplomowa.web.models.CategoriesModel;
import pl.wszib.praca_dyplomowa.web.models.SubcategoriesModel;

public class CategoriesMapper {
    public static CategoriesModel toModel(CategoryEntity entity) {
        return new CategoriesModel(entity.getId(), entity.getCategory(),
                entity.getColor(), entity.getOperationType(), entity.getUserName());
    }

    public static CategoryEntity toEntity(CategoriesModel model) {
        final var entity = new CategoryEntity();
        entity.setUserName(getAuthenticatedUser());
        entity.setCategory(model.getCategory());
        entity.setColor(model.getColor());
        entity.setOperationType(model.getOperationType());
        return entity;
    }

    public static String getAuthenticatedUser() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
