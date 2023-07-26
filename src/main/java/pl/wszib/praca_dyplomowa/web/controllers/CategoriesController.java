package pl.wszib.praca_dyplomowa.web.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import pl.wszib.praca_dyplomowa.services.CategoriesService;
import pl.wszib.praca_dyplomowa.services.SubcategoriesService;
import pl.wszib.praca_dyplomowa.web.models.CategoriesModel;
import pl.wszib.praca_dyplomowa.web.models.SubcategoriesModel;
import pl.wszib.praca_dyplomowa.web.models.TransactionModel;

import java.util.List;

@Controller
public class CategoriesController {

    private final SubcategoriesService subcategoriesService;
    private final CategoriesService categoriesService;

    public CategoriesController(SubcategoriesService subcategoriesService, CategoriesService categoriesService) {
        this.subcategoriesService = subcategoriesService;
        this.categoriesService = categoriesService;
    }

    @GetMapping("/categories")
    public String subcategoriesOverview(Model model) {
        List<SubcategoriesModel> categories = subcategoriesService.findAll();
        model.addAttribute("categories", categories);
        return "categories";
    }

    @GetMapping("/subcategories/json")
    public ResponseEntity<List<SubcategoriesModel>> getSubcategories() {

        return new ResponseEntity(subcategoriesService.listAll(), HttpStatus.OK);
    }
    @GetMapping("/categories/json")
    public ResponseEntity<List<CategoriesModel>> getCategories() {

        return new ResponseEntity(categoriesService.findAll(), HttpStatus.OK);
    }

    @PostMapping("/subcategories/{category_Id}")
    @ResponseBody
    public String addTransaction(@RequestBody SubcategoriesModel subcategoriesModel,
                                 @PathVariable("category_Id") Long categoryID) {
        final var orderId = subcategoriesService.saveSubcategories(categoryID, subcategoriesModel);

        return "redirect:categories";
    }
}
