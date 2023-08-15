package pl.wszib.praca_dyplomowa.data.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.wszib.praca_dyplomowa.data.entities.User;


public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE u.username = :username")
    public User findUserByUsername(@Param("username") String username);
}
