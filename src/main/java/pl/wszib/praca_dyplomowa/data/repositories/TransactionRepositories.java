package pl.wszib.praca_dyplomowa.data.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.wszib.praca_dyplomowa.data.entities.CategoryEntity;
import pl.wszib.praca_dyplomowa.data.entities.SubcategoryEntity;
import pl.wszib.praca_dyplomowa.data.entities.TransactionEntity;

import java.util.List;

public interface TransactionRepositories extends JpaRepository<TransactionEntity, Long> {

    @Query("from TransactionEntity where userName = :user")
    public List<TransactionEntity> getTransactionsByUser (String user);
}
