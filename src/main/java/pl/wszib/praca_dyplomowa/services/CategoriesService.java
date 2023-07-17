package pl.wszib.praca_dyplomowa.services;

import org.springframework.stereotype.Service;
import pl.wszib.praca_dyplomowa.data.repositories.CategoriesRepositories;
import pl.wszib.praca_dyplomowa.web.mappers.CategoriesMapper;
import pl.wszib.praca_dyplomowa.web.mappers.TransactionMapper;
import pl.wszib.praca_dyplomowa.web.models.CategoriesModel;
import pl.wszib.praca_dyplomowa.web.models.TransactionModel;

import java.util.List;

@Service
public class CategoriesService {

    private final CategoriesRepositories categoriesRepositories;

    public CategoriesService(CategoriesRepositories categoriesRepositories) {
        this.categoriesRepositories = categoriesRepositories;
    }

    public List<CategoriesModel> findAll() {
        final var entities = categoriesRepositories.findAll();

        return entities.stream()
                .map(CategoriesMapper::toModel)
                .toList();
    }
}
