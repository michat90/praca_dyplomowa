package pl.wszib.praca_dyplomowa.web.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import pl.wszib.praca_dyplomowa.services.CategoriesService;
import pl.wszib.praca_dyplomowa.web.models.CategoriesModel;
import pl.wszib.praca_dyplomowa.web.models.TransactionModel;

import java.util.List;

@Controller
public class CategoriesController {

    private final CategoriesService categoriesService;

    public CategoriesController(CategoriesService categoriesService) {
        this.categoriesService = categoriesService;
    }

    @GetMapping("/categories")
    public String categoriesOverview(Model model) {
        List<CategoriesModel> categories = categoriesService.findAll();
        model.addAttribute("categories", categories);
        return "categories";
    }

//    @GetMapping("/categories-editor")
//    public String categoriesEditor(Model model) {
//        List<CategoriesModel> categories = categoriesService.findAll();
//        model.addAttribute("categories", categories);
//        return "categoriesEditor";
//    }

    @GetMapping("/categories/json-cat")
    public ResponseEntity<List<CategoriesModel>> getCategories() {

        return new ResponseEntity(categoriesService.findAll(), HttpStatus.OK);
    }
}
