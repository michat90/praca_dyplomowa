package pl.wszib.praca_dyplomowa.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import pl.wszib.praca_dyplomowa.data.repositories.UserRepository;

import java.util.ArrayList;
import java.util.List;


@Component
public class AuthProvider implements AuthenticationProvider {
    @Autowired
    UserRepository userRepository;

    UserDetails isValidUser(String username, String password) {
        try {
            UserDetails user = userRepository.findUserByUsername(username);
            if (username.equalsIgnoreCase(user.getUsername())
                    && password.equals(user.getPassword())) {

                user = User
                        .withUsername(username)
                        .password("NOT_DISCLOSED")
                        .roles("USER_ROLE")
                        .build();

                return user;
            }
        } catch (NullPointerException e) {
            return null;
        }
        return null;
    }
    UserDetails isUserExisted(String username) {
        try {
            UserDetails user = userRepository.findUserByUsername(username);
            return user;
        } catch (NullPointerException e) {
            return null;
        }
    }
    @Override
    public Authentication authenticate(Authentication authentication) {
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();

        UserDetails userDetails = isValidUser(username, password);
        if (isUserExisted(username) == null) {
            throw new BadCredentialsException("User not found");
        } else if (userDetails != null) {
            return new UsernamePasswordAuthenticationToken(
                    username,
                    password,
                    userDetails.getAuthorities());
        } else {
            throw new BadCredentialsException("Incorrect user credentials !!");
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return true;
    }
}
