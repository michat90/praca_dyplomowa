package pl.wszib.praca_dyplomowa.web.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import pl.wszib.praca_dyplomowa.services.SubcategoriesService;
import pl.wszib.praca_dyplomowa.services.TransactionService;
import pl.wszib.praca_dyplomowa.web.models.TransactionModel;

@Controller
public class TransactionController {
    private final TransactionService transactionService;
    private final SubcategoriesService subcategoriesService;

    public TransactionController(TransactionService transactionService, SubcategoriesService subcategoriesService) {
        this.transactionService = transactionService;
        this.subcategoriesService = subcategoriesService;
    }

    @GetMapping("/new-transaction")
    public String transaction(Model model) {

        return "newTransaction";
    }

    @PostMapping("/new-transaction")
    @ResponseBody
    public String addTransaction(@RequestBody TransactionModel transactionModel) {
        transactionService.createTransaction(transactionModel);
        return "redirect:new-transaction";
    }
}
