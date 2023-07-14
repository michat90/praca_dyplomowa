package pl.wszib.praca_dyplomowa.web.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import pl.wszib.praca_dyplomowa.services.TransactionService;
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
        List<TransactionModel> opinions = transactionService.findAll();
        model.addAttribute("transactions", opinions);
        return "history";
    }

}
