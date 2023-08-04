package pl.wszib.praca_dyplomowa.web.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import pl.wszib.praca_dyplomowa.services.TransactionService;
import pl.wszib.praca_dyplomowa.web.models.SubcategoriesModel;
import pl.wszib.praca_dyplomowa.web.models.TransactionModel;

import java.util.List;

@Controller
public class HistoryController {

    private final TransactionService transactionService;

    public HistoryController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping("/history")
    public String opinionForm(Model model) {
        return "history";
    }

    @GetMapping("/history/json")
    public ResponseEntity<List<SubcategoriesModel>> getSubcategories() {

        return new ResponseEntity(transactionService.findAll(), HttpStatus.OK);
    }
}
