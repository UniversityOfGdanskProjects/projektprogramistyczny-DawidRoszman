package eu.dawidroszman.cinema.CinemaAPI.services;

import eu.dawidroszman.cinema.CinemaAPI.models.MovieEntity;
import eu.dawidroszman.cinema.CinemaAPI.models.PersonEntity;
import eu.dawidroszman.cinema.CinemaAPI.repositories.PersonRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {

    PersonRepository personRepository;

    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public void createPerson(String name, Integer born) {
        personRepository.save(new PersonEntity(born, name));
    }

    public void deletePerson(String name) {
        personRepository.deleteByName(name);
    }

    public void modifyPerson(String name, Integer born) {
        personRepository.modifyPerson(name, born);
    }

    public void addMovieToPerson(String personName, String movieTitle) {
        personRepository.addMovieToPerson(personName, movieTitle);
    }

    public void removeMovieFromPerson(String personName, String movieTitle) {
        personRepository.removeMovieFromPerson(personName, movieTitle);
    }

    public List<String> findAllMoviesWithPerson(String personName) {
        return personRepository.findAllMoviesWithPerson(personName);
    }

    public List<PersonEntity> findAll() {
        return personRepository.findAll();
    }
}
