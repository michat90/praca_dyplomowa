package pl.wszib.praca_dyplomowa.web.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import pl.wszib.praca_dyplomowa.services.SubcategoriesService;
import pl.wszib.praca_dyplomowa.web.models.SubcategoriesModel;

import java.util.List;

@Controller
public class SubcategoriesController {

    private final SubcategoriesService subcategoriesService;

    public SubcategoriesController(SubcategoriesService subcategoriesService) {
        this.subcategoriesService = subcategoriesService;
    }


    @GetMapping("/subcategories/json")
    public ResponseEntity<List<SubcategoriesModel>> getSubcategories() {

        return new ResponseEntity(subcategoriesService.listAll(), HttpStatus.OK);
    }

    @PostMapping("/subcategories/{category_Id}")
    @ResponseBody
    public String addTransaction(@RequestBody SubcategoriesModel subcategoriesModel,
                                 @PathVariable("category_Id") Long categoryID) {
        final var orderId = subcategoriesService.saveSubcategories(categoryID, subcategoriesModel);

        return "redirect:categories";
    }

    @GetMapping("/subcategories/{subcategory_Id}")
    public ResponseEntity<List<SubcategoriesModel>> getSubcategoryById(@PathVariable("subcategory_Id") Long subcategoryID) {

        return new ResponseEntity(subcategoriesService.getById(subcategoryID), HttpStatus.OK);
    }

    @PostMapping("/subcategories-edit/{category_Id}/{subcategory_id}")
    @ResponseBody
    public String editSubcategory(@RequestBody SubcategoriesModel subcategoriesModel,
                                  @PathVariable("subcategory_id") Long subcategoryID,
                                  @PathVariable("category_Id") Long categoryID) {

        subcategoriesService.editSubcategory(categoryID, subcategoryID, subcategoriesModel);
        return "redirect:categories";
    }

    @PostMapping("subcategories/delete/{subcategory_id}")
    public String deleteSubcategory(@PathVariable("subcategory_id") Long subcategoryID) {
        subcategoriesService.deleteById(subcategoryID);

        return "redirect:/categories";
    }

}
