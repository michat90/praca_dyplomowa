package pl.wszib.praca_dyplomowa.services;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.wszib.praca_dyplomowa.data.entities.CategoryEntity;
import pl.wszib.praca_dyplomowa.data.entities.TransactionEntity;
import pl.wszib.praca_dyplomowa.data.repositories.TransactionRepositories;
import pl.wszib.praca_dyplomowa.web.mappers.TransactionMapper;
import pl.wszib.praca_dyplomowa.web.models.TransactionModel;

import java.util.List;

@Service
public class TransactionService {
    private final TransactionRepositories transactionRepositories;

    public TransactionService(TransactionRepositories transactionRepositories) {
        this.transactionRepositories = transactionRepositories;
    }

    public List<TransactionModel> findAll() {
        final var entities = transactionRepositories.findAll();

        return entities.stream()
                .map(TransactionMapper::toModel)
                .toList();
    }

    @Transactional
    public void createTransaction(TransactionModel transactionModel) {
        final var entity = TransactionMapper.toEntity(transactionModel);

        transactionRepositories.save(entity);
    }

    @Transactional
    public void deleteById(Long transactionId) {
        transactionRepositories.deleteById(transactionId);
    }

    public TransactionEntity getTransactionById (Long transactionId) {

        return transactionRepositories.findById(transactionId)
                .orElseThrow(
                        EntityNotFoundException::new);
    }


}
