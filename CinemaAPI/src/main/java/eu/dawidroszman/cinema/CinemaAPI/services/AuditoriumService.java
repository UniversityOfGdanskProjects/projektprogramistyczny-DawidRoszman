package eu.dawidroszman.cinema.CinemaAPI.services;

import eu.dawidroszman.cinema.CinemaAPI.models.AuditoriumEntity;
import eu.dawidroszman.cinema.CinemaAPI.repositories.AuditoriumRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuditoriumService {
    private final AuditoriumRepository auditoriumRepository;

    public AuditoriumService(AuditoriumRepository auditoriumRepository) {
        this.auditoriumRepository = auditoriumRepository;
    }

    public AuditoriumEntity getAuditoriumByNumber(Integer number) {
        return auditoriumRepository.findByNumber(number);
    }

    public List<AuditoriumEntity> getAllAuditoriums() {
        return auditoriumRepository.findAll();
    }
}
