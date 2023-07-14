package pl.wszib.praca_dyplomowa.data.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.wszib.praca_dyplomowa.data.entities.TransactionEntity;

public interface TransactionRepositories extends JpaRepository<TransactionEntity, Long> {
}
