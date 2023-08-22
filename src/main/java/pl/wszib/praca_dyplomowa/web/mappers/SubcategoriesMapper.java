package pl.wszib.praca_dyplomowa.web.mappers;

import org.springframework.security.core.context.SecurityContextHolder;
import pl.wszib.praca_dyplomowa.data.entities.SubcategoryEntity;
import pl.wszib.praca_dyplomowa.web.models.SubcategoriesModel;

public class SubcategoriesMapper {
    public static SubcategoriesModel toModel(SubcategoryEntity entity) {
        return new SubcategoriesModel(entity.getId(), entity.getCategoryEntity(), entity.getSubCategory(),
                entity.getColor(),entity.getOperationType(), entity.getUserName());
    }

    public static SubcategoryEntity toEntity(SubcategoriesModel model) {
        final var entity = new SubcategoryEntity();
        entity.setUserName(getAuthenticatedUser());
        entity.setCategoryEntity(model.getCategoryEntity());
        entity.setSubCategory(model.getSubCategory());
        entity.setColor((model.getColor()));
        entity.setOperationType(model.getOperationType());
        return entity;
    }

    public static String getAuthenticatedUser() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
