package pl.wszib.praca_dyplomowa.web.mappers;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import pl.wszib.praca_dyplomowa.data.entities.TransactionEntity;
import pl.wszib.praca_dyplomowa.web.models.TransactionModel;

public class TransactionMapper {

  public static TransactionModel toModel(TransactionEntity entity) {
    return new TransactionModel(entity.getId(), entity.getAmount(), entity.getDate(),
        entity.getCategory(),entity.getSubcategory(),entity.getTag(),
            entity.getTitle(), entity.getUserName(), entity.getTransactionType());
  }

  public static TransactionEntity toEntity(TransactionModel model) {
    final var entity = new TransactionEntity();
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String currentPrincipalName = authentication.getName();

    entity.setUserName(currentPrincipalName);
    entity.setAmount(model.getAmount());
    entity.setDate(model.getDate());
    entity.setCategory(model.getCategory());
    entity.setSubcategory(model.getSubcategory());
    entity.setTag(model.getTag());
    entity.setTitle(model.getTitle());
    entity.setTransactionType(model.getTransactionType());
    return entity;
  }
}
