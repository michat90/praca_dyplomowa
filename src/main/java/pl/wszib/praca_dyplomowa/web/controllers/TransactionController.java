package pl.wszib.praca_dyplomowa.web.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import pl.wszib.praca_dyplomowa.services.CategoriesService;
import pl.wszib.praca_dyplomowa.services.TransactionService;
import pl.wszib.praca_dyplomowa.web.models.CategoriesModel;
import pl.wszib.praca_dyplomowa.web.models.TransactionModel;

import java.util.List;

@Controller
public class TransactionController {
    private final TransactionService transactionService;
    private final CategoriesService categoriesService;

    public TransactionController(TransactionService transactionService, CategoriesService categoriesService) {
        this.transactionService = transactionService;
        this.categoriesService = categoriesService;
    }

    @GetMapping("/new-transaction")
    public String transaction(Model model) {

        return "newTransaction";
    }

    @GetMapping("/new-transaction/json-cat")
    public ResponseEntity<List<CategoriesModel>> getCategories() {

        return new ResponseEntity(categoriesService.findAll(), HttpStatus.OK);
    }



    @PostMapping("/new-transaction")
    @ResponseBody
    public String addTransaction(@RequestBody TransactionModel transactionModel) {
        transactionService.createTransaction(transactionModel);
        return "redirect:new-transaction";
    }
}
