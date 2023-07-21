package pl.wszib.praca_dyplomowa.services;

import org.springframework.stereotype.Service;
import pl.wszib.praca_dyplomowa.data.repositories.SubcategoriesRepositories;
import pl.wszib.praca_dyplomowa.web.mappers.SubcategoriesMapper;
import pl.wszib.praca_dyplomowa.web.models.SubcategoriesModel;

import java.util.List;

@Service
public class SubcategoriesService {

    private final SubcategoriesRepositories subcategoriesRepositories;

    public SubcategoriesService(SubcategoriesRepositories subcategoriesRepositories) {
        this.subcategoriesRepositories = subcategoriesRepositories;
    }

    public List<SubcategoriesModel> findAll() {
        final var entities = subcategoriesRepositories.findAll();

        return entities.stream()
                .map(SubcategoriesMapper::toModel)
                .toList();
    }
}
