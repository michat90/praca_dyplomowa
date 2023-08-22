package pl.wszib.praca_dyplomowa.web.controllers;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import pl.wszib.praca_dyplomowa.data.entities.User;
import pl.wszib.praca_dyplomowa.data.repositories.UserRepository;
import pl.wszib.praca_dyplomowa.services.MyUserDetailsService;

import java.util.Map;


@Controller
public class UsersController {

    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    MyUserDetailsService userDetailsManager;
    private final UserRepository userRepository;

    public UsersController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/login")
    public String login(HttpServletRequest request, HttpSession session) {
        session.setAttribute(
                "error", getErrorMessage(request, "SPRING_SECURITY_LAST_EXCEPTION")
        );
        return "Login";
    }

    @GetMapping("/logout")
    public String logout() {
        return "redirect:login";
    }

    @GetMapping("/register")
    public String register(HttpServletRequest request, HttpSession session) {
        session.setAttribute(
                "error", getErrorMessage(request, "SPRING_SECURITY_LAST_EXCEPTION")
        );
        return "register";
    }

    private String getErrorMessage(HttpServletRequest request, String key) {
        Exception exception = (Exception) request.getSession().getAttribute(key);
        String error = "";
        if (exception instanceof BadCredentialsException) {
            error = exception.getMessage();
        } else if (exception instanceof LockedException) {
            error = exception.getMessage();
        } else {
            error = "Invalid username and password!";
        }
        return error;
    }

    @PostMapping(value = "/register")
    public String addUser(@RequestParam Map<String, String> body) {
        User user = new User();
        user.setRoles("ROLE_USER");
        user.setUserName(body.get("username"));
        user.setPassword(passwordEncoder.encode(body.get("password")));
        user.setActive(true);
        userDetailsManager.saveUser(user);
        return "Login";
    }





}
