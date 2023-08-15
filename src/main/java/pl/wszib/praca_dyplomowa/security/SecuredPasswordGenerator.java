package pl.wszib.praca_dyplomowa.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class SecuredPasswordGenerator {

        public String getEncodedPassword(String rawPassword) {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            return  encoder.encode(rawPassword);
        }


}