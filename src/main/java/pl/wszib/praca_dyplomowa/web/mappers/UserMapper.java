package pl.wszib.praca_dyplomowa.web.mappers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import pl.wszib.praca_dyplomowa.data.entities.TransactionEntity;
import pl.wszib.praca_dyplomowa.data.entities.User;
import pl.wszib.praca_dyplomowa.web.models.MyUserDetails;
import pl.wszib.praca_dyplomowa.web.models.TransactionModel;

public class UserMapper {
    @Autowired
    PasswordEncoder passwordEncoder;

}

