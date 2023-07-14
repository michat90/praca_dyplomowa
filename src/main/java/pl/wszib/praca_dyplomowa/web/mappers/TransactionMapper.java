package pl.wszib.praca_dyplomowa.web.mappers;

import pl.wszib.praca_dyplomowa.data.entities.TransactionEntity;
import pl.wszib.praca_dyplomowa.web.models.TransactionModel;

public class TransactionMapper {

  public static TransactionModel toModel(TransactionEntity entity) {
    return new TransactionModel(entity.getId(), entity.getAmount(), entity.getDate(),
        entity.getCategory(),entity.getSubCategory(),entity.getTag(),
            entity.getTitle());
  }

  public static TransactionEntity toEntity(TransactionModel model) {
    final var entity = new TransactionEntity();


    entity.setAmount(model.getAmount());
    entity.setDate(model.getDate());
    entity.setCategory(model.getCategory());
    entity.setSubCategory(model.getSubCategory());
    entity.setTag(model.getTag());
    entity.setTitle(model.getTitle());
    return entity;
  }
}
