package ma.ac.emi.ginfo.hg.emiflights.restcontrollers;

import ma.ac.emi.ginfo.hg.emiflights.authentication.config.JwtUtils;
import ma.ac.emi.ginfo.hg.emiflights.entities.Plane;
import ma.ac.emi.ginfo.hg.emiflights.services.PlaneService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/plane")
public class PlaneController {
    private final JwtUtils jwtUtils;
    private final PlaneService planeService;

    public PlaneController(JwtUtils jwtUtils, PlaneService planeService) {
        this.jwtUtils = jwtUtils;
        this.planeService = planeService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Plane>> getAllPlanes(@RequestHeader(HttpHeaders.AUTHORIZATION) String bearerToken) {
        String token = bearerToken.substring(7);
        String username = jwtUtils.extractUsername(token);
        System.out.println(username);
        List<Plane> planes = planeService.findAllPlanes();
        return new ResponseEntity<>(planes, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Plane> addPlane(@RequestBody Plane plane) {
        Plane newPlane = planeService.addPlane(plane);
        return new ResponseEntity<>(newPlane, HttpStatus.CREATED);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Plane> getPlaneById(@PathVariable UUID id) {
        Plane plane = planeService.findPlaneById(id);
        return new ResponseEntity<>(plane, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Plane> updatePlane(@RequestBody Plane plane) {
        Plane updatedPlane = planeService.updatePlane(plane);
        return new ResponseEntity<>(updatedPlane, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePlane(@PathVariable("id") UUID id) {
        planeService.deletePlane(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
