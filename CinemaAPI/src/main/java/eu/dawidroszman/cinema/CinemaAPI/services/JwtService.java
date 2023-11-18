package eu.dawidroszman.cinema.CinemaAPI.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.function.Function;

@Service
public class JwtService {

    private static final String SECRET_KEY="2nigIa3EGogMjftwcvTpSK5C2uIKLiiJzK5+/y0hjFEtYl/MarxDUrUMToyeuCJE1QrOKneZw2F/Lbs3K67WD0OSecupSPnctelw6pIFz5jM4KdGyGWBmsok0hIY5kngFPXpYfCKc/J7mLz+XBOMs2BJL58LRng5tjmz/vhzOUYP8ZMqgXm31T8VXsrk1M300dTHZbihdUzpmKmPdReHVrr76wWbx6+FL/lazCiEr1Th/r9jnlsjjEfIUtdbW0bpfNFngkfc+O3W1xeBmzgTOzDtBHj75b9bO0ym12N1bS11k/RKrmWCAZWVF6B+NBh7gQ/euOn001+d6givy/3kibbe40VV4iC6CL5Qq+7PPBY=";

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.
                parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}