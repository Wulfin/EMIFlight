package ma.ac.emi.ginfo.hg.emiflights.authentication.config;

import lombok.RequiredArgsConstructor;
import ma.ac.emi.ginfo.hg.emiflights.entities.User;
import ma.ac.emi.ginfo.hg.emiflights.repositories.UserRepository;
import ma.ac.emi.ginfo.hg.emiflights.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserDao userDao;
    private final JwtUtils jwtUtils;

    private Map<UserDetails, String> generatedTokens = new HashMap<>();
    private final UserService userService;


    @PostMapping("/authenticate")
    public ResponseEntity<Response> authenticate(@RequestBody AuthenticationRequest request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        /*User user = userService.findUserByUsername(request.getEmail());
        if (user != null){
            if(user.getToken() == null){
                String token = jwtUtils.generateToken(user);
                user.setToken(token);
            }
            return ResponseEntity.ok(new Response(user.getToken()));
        }*/
        UserDetails userDetails = userDao.findUserByEmail(request.getEmail());
        UserDetails userDetails_copy = new User(userDetails.getUsername(), request.getPassword(),
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")));
        if (userDetails != null){
            if (generatedTokens.containsKey(userDetails)){
                return ResponseEntity.ok(new Response(this.generatedTokens.get(userDetails),
                        UserDao.getTokens(), userDetails_copy));
            }
            else{
                String token = jwtUtils.generateToken(userDetails);
                this.generatedTokens.put(userDetails, token);
                List<String> tokens = UserDao.getTokens();
                tokens.add(token);
                UserDao.setTokens(tokens);
                return ResponseEntity.ok(new Response(token,
                        UserDao.getTokens(), userDetails_copy));
            }
        }
        return (ResponseEntity<Response>) ResponseEntity.badRequest();
    }
}

class Response {
    private String token;
    private UserDetails userDetails;
    private List<String> tokens;

    public Response(String token, List<String> tokens, UserDetails userDetails) {
        this.token = token;
        this.tokens = tokens;
        this.userDetails = userDetails;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public List<String> getTokens() {
        return tokens;
    }

    public void setTokens(List<String> tokens) {
        this.tokens = tokens;
    }

    public UserDetails getUserDetails() {
        return userDetails;
    }

    public void setUserDetails(UserDetails userDetails) {
        this.userDetails = userDetails;
    }
}
