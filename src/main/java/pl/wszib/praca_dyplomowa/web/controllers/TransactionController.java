package pl.wszib.praca_dyplomowa.web.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import pl.wszib.praca_dyplomowa.services.TransactionService;
import pl.wszib.praca_dyplomowa.web.models.SubcategoriesModel;
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
        return "newTransaction";
    }

    @GetMapping("/new-transaction/{transaction_id}")
    public String transactionWithId(@PathVariable("transaction_id") Long transactionId,
                                    Model model) {

        return "newTransaction";
    }

    @PostMapping("/new-transaction")
    @ResponseBody
    public String addTransaction(@RequestBody TransactionModel transactionModel) {
        transactionService.createTransaction(transactionModel);
        return "redirect:new-transaction";
    }

    @PostMapping("transactions/delete/{transaction_id}")
    public String deleteTransaction(@PathVariable("transaction_id") Long transactionId) {
        transactionService.deleteById(transactionId);

        return "redirect:/history";
    }

    @GetMapping("/transactions/{transaction_id}")
    public ResponseEntity<List<SubcategoriesModel>> getTransactionById(@PathVariable("transaction_id") Long transactionId) {

        return new ResponseEntity(transactionService.getTransactionById(transactionId), HttpStatus.OK);
    }

    @PostMapping("transactions/edit/{transaction_id}")
    public String editTransaction(@PathVariable("transaction_id") Long transactionId,
                                  @RequestBody TransactionModel transactionModel) {
        transactionService.editTransaction(transactionId, transactionModel);

        return "redirect:/new-transaction";
    }
}
