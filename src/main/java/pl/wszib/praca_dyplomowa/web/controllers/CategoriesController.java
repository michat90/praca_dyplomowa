package pl.wszib.praca_dyplomowa.web.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
        List<SubcategoriesModel> categories = subcategoriesService.listAll();
        model.addAttribute("categories", categories);
        return "categories";
    }

    @GetMapping("/categories/json")
    public ResponseEntity<List<CategoriesModel>> getCategories() {

        return new ResponseEntity(categoriesService.findAll(), HttpStatus.OK);
    }


    @PostMapping("/categories")
    @ResponseBody
    public String addTransaction(@RequestBody CategoriesModel categoriesModel) {
        categoriesService.saveCategory(categoriesModel);
        return "redirect:categories";
    }

    @GetMapping("/categories-filter/{category_name}")
    public ResponseEntity<List<SubcategoriesModel>> getSubcategoryById(@PathVariable("category_name") String categoryName) {

        return new ResponseEntity(categoriesService.getCategoryByName(categoryName), HttpStatus.OK);
    }

    @PostMapping("categories/delete/{category_id}")
    public String deleteCategory(@PathVariable("category_id") Long categoryID) {
        categoriesService.deleteById(categoryID);

        return "redirect:/categories";
    }

    @GetMapping("/categories/{category_Id}")
    public ResponseEntity<List<SubcategoriesModel>> getCategoryById(@PathVariable("category_Id") Long categoryID) {

        return new ResponseEntity(categoriesService.getById(categoryID), HttpStatus.OK);
    }

    @PostMapping("/categories-edit/{category_Id}")
    @ResponseBody
    public String editSubcategory(@RequestBody CategoriesModel categoriesModel,
                                  @PathVariable("category_Id") Long categoryID) {

        categoriesService.editCategory(categoryID, categoriesModel);
        return "redirect:categories";
    }
}
