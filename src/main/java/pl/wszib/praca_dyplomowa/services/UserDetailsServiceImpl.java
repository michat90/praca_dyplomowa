package pl.wszib.praca_dyplomowa.services;

import jakarta.validation.constraints.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.wszib.praca_dyplomowa.data.entities.User;
import pl.wszib.praca_dyplomowa.data.repositories.UserRepository;
import pl.wszib.praca_dyplomowa.web.models.MyUserDetails;
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        try {
            User user = userRepository.findUserByUsername(username);
            return user;
        } catch (TypeNotPresentException e) {
            throw new UsernameNotFoundException("Could not find user");
        }
    }
    @Transactional
    public void createUser(User user) {
            userRepository.save(user);
    }
}
