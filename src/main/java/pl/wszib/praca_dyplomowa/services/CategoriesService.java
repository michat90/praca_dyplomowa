package pl.wszib.praca_dyplomowa.services;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.wszib.praca_dyplomowa.data.repositories.CategoriesRepositories;
import pl.wszib.praca_dyplomowa.data.repositories.SubcategoriesRepositories;
import pl.wszib.praca_dyplomowa.web.mappers.CategoriesMapper;
import pl.wszib.praca_dyplomowa.web.mappers.SubcategoriesMapper;
import pl.wszib.praca_dyplomowa.web.mappers.TransactionMapper;
import pl.wszib.praca_dyplomowa.web.models.CategoriesModel;
import pl.wszib.praca_dyplomowa.web.models.SubcategoriesModel;
import pl.wszib.praca_dyplomowa.web.models.TransactionModel;

import java.util.List;

@Service
public class CategoriesService {

    private final CategoriesRepositories categoriesRepositories;
    private final SubcategoriesRepositories subcategoriesRepositories;

    public CategoriesService(CategoriesRepositories categoriesRepositories, SubcategoriesRepositories subcategoriesRepositories) {
        this.categoriesRepositories = categoriesRepositories;
        this.subcategoriesRepositories = subcategoriesRepositories;
    }

    public List<CategoriesModel> findAll() {
        final var entities = categoriesRepositories.findAll();

        return entities.stream()
                .map(CategoriesMapper::toModel)
                .toList();
    }



//    public PizzaModel getById(Long pizzaId) {
//        final var entity = pizzaRepository.findById(pizzaId)
//                .orElseThrow(EntityNotFoundException::new);
//
//        return PizzaMapper.toModel(entity);
//    }
}
