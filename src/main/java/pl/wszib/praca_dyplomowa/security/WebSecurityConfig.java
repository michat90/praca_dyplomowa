package pl.wszib.praca_dyplomowa.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.*;


import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.*;
import org.springframework.security.config.annotation.web.configuration.*;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;


import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Autowired
    private AuthProvider authProvider;

    @Autowired
    public void configure(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(authProvider);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService jdbcUserDetailsService(DataSource dataSource) {

        return new JdbcUserDetailsManager(dataSource);
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .authorizeHttpRequests((requests) -> requests
                        .requestMatchers("/","/register**","/css**").permitAll()
                        .requestMatchers(HttpMethod.POST).permitAll()
                        .anyRequest().permitAll()
                )
                .formLogin((form) -> form
                        .loginPage("/login")
                        .passwordParameter("password")
                        .usernameParameter("username")
                        .defaultSuccessUrl("/dashboard")
                        .failureUrl("/login?error")
                        .permitAll()
                )
                .logout(LogoutConfigurer::permitAll)
                .anonymous(AbstractHttpConfigurer::disable);
        http.csrf(AbstractHttpConfigurer::disable);
        http.sessionManagement((session) -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        return http.build();
    }

    @Bean
    public InMemoryUserDetailsManager userDetailsService() {
        UserDetails user = User.withUsername("user")
                .password("abc")
                .authorities("USER")
                .build();
        UserDetails admin = User.withUsername("admin1")
                .password("{noop}admin1Pass")
                .authorities("ROLE_ADMIN")
                .build();
        return new InMemoryUserDetailsManager(user, admin);
    }





}
