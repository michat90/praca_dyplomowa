package pl.wszib.praca_dyplomowa.web.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import pl.wszib.praca_dyplomowa.services.TransactionService;
import pl.wszib.praca_dyplomowa.web.models.TransactionModel;

import java.util.List;

@Controller
public class TransactionController {
    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping("/new-transaction")
    public String transaction(Model model) {
        model.addAttribute("new_transaction", new TransactionModel());
        return "newTransaction";
    }

    @PostMapping("/new-transaction")
    @ResponseBody
    public String addTransaction(@RequestBody TransactionModel transactionModel) {
        transactionService.createTransaction(transactionModel);
        return "redirect:/new-transaction";
    }
}
