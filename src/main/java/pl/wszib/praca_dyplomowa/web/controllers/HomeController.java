package pl.wszib.praca_dyplomowa.web.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;

@Controller
public class HomeController {

  @GetMapping("/")
  public String homePage(@CurrentSecurityContext SecurityContext context) {
    System.out.println(context.getAuthentication().getName());
    return "homePage";
  }
}
