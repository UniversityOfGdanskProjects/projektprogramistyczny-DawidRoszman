package eu.dawidroszman.cinema.CinemaAPI.enums;

public class Price {
    public static final Double NORMAL = 20.0;
    public static final Double STUDENT = 15.0;
    public static final Double CHILD = 10.0;
    public static final Double SENIOR = 10.0;
    public static final Double VIP = 7.0;

    public static Double getPrice(String discount, Boolean isVip) {
        Double price = switch (discount) {
            case "STUDENT" -> STUDENT;
            case "CHILD" -> CHILD;
            case "SENIOR" -> SENIOR;
            default -> NORMAL;
        };
        if (isVip) {
            price += VIP;
        }
        return price;
    }
}
