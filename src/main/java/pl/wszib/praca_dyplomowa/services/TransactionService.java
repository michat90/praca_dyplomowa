package pl.wszib.praca_dyplomowa.services;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        transactionModel.setUserName(currentPrincipalName);
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

    @Transactional
    public void editTransaction(Long transactionId,  TransactionModel transactionModel) {
        TransactionEntity transactionEntity = transactionRepositories.findById(transactionId)
                .orElseThrow(
                        EntityNotFoundException::new);

        transactionEntity.setAmount(transactionModel.getAmount());
        transactionEntity.setDate(transactionModel.getDate());
        transactionEntity.setCategory(transactionModel.getCategory());
        transactionEntity.setSubcategory(transactionModel.getSubcategory());
        transactionEntity.setTitle(transactionModel.getTitle());
        transactionEntity.setTag(transactionModel.getTag());
        transactionEntity.setTransactionType(transactionModel.getTransactionType());
        transactionRepositories.save(transactionEntity);
    }

    public List<TransactionModel> getTransactionsByUser(String user) {

        final var entities = transactionRepositories.getTransactionsByUser(user);

        return entities.stream()
                .map(TransactionMapper::toModel)
                .toList();
    }

    public String getAuthenticatedUser() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }



}
