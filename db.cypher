# creating auditoriums and filling them with seats

CREATE (:Auditorium {number: 1});
CREATE (:Auditorium {number: 2});
CREATE (:Auditorium {number: 3});
MATCH (a:Auditorium {number: 1}) WITH a
CREATE (a)-[:HAS]->(:Seat {row: 1, column: 1, isVIP: false})
CREATE (a)-[:HAS]->(:Seat {row: 1, column: 2, isVIP: false})
CREATE (a)-[:HAS]->(:Seat {row: 1, column: 3, isVIP: false})
CREATE (a)-[:HAS]->(:Seat {row: 2, column: 1, isVIP: true})
CREATE (a)-[:HAS]->(:Seat {row: 2, column: 2, isVIP: true})
CREATE (a)-[:HAS]->(:Seat {row: 2, column: 3, isVIP: true})
CREATE (a)-[:HAS]->(:Seat {row: 3, column: 1, isVIP: false})
CREATE (a)-[:HAS]->(:Seat {row: 3, column: 2, isVIP: false})
CREATE (a)-[:HAS]->(:Seat {row: 3, column: 3, isVIP: false});

MATCH (a:Auditorium {number: 2}) WITH a
CREATE (a)-[:HAS]->(:Seat {row: 1, column: 1, isVIP: false})
CREATE (a)-[:HAS]->(:Seat {row: 1, column: 2, isVIP: false})
CREATE (a)-[:HAS]->(:Seat {row: 1, column: 3, isVIP: false})
CREATE (a)-[:HAS]->(:Seat {row: 2, column: 1, isVIP: true})
CREATE (a)-[:HAS]->(:Seat {row: 2, column: 2, isVIP: true})
CREATE (a)-[:HAS]->(:Seat {row: 2, column: 3, isVIP: true})
CREATE (a)-[:HAS]->(:Seat {row: 3, column: 1, isVIP: false})
CREATE (a)-[:HAS]->(:Seat {row: 3, column: 2, isVIP: false})
CREATE (a)-[:HAS]->(:Seat {row: 3, column: 3, isVIP: false});

MATCH (a:Auditorium {number: 3}) WITH a
CREATE (a)-[:HAS]->(:Seat {row: 1, column: 1, isVIP: false})
CREATE (a)-[:HAS]->(:Seat {row: 1, column: 2, isVIP: false})
CREATE (a)-[:HAS]->(:Seat {row: 1, column: 3, isVIP: false})
CREATE (a)-[:HAS]->(:Seat {row: 2, column: 1, isVIP: true})
CREATE (a)-[:HAS]->(:Seat {row: 2, column: 2, isVIP: true})
CREATE (a)-[:HAS]->(:Seat {row: 2, column: 3, isVIP: true})
CREATE (a)-[:HAS]->(:Seat {row: 3, column: 1, isVIP: false})
CREATE (a)-[:HAS]->(:Seat {row: 3, column: 2, isVIP: false})
CREATE (a)-[:HAS]->(:Seat {row: 3, column: 3, isVIP: false});

# creating screenings
MATCH (m1:Movie), (a1:Auditorium)
WHERE m1.title = "The Matrix" AND a1.number = 1
CREATE (m1)<-[:PLAYS]-(:Screening {date: "2024-01-01", time: "12:00"})-[:IS_IN]->(a1);

MATCH (m2:Movie), (a2:Auditorium)
WHERE m2.title = "Top Gun" AND a2.number = 2
CREATE (m2)<-[:PLAYS]-(:Screening {date: "2024-01-01", time: "14:00"})-[:IS_IN]->(a2);

MATCH (m3:Movie), (a3:Auditorium)
WHERE m3.title = "Few Good Man" AND a3.number = 3
CREATE (m3)<-[:PLAYS]-(:Screening {date: "2024-01-01", time: "16:00"})-[:IS_IN]->(a3);

MATCH (m4:Movie), (a4:Auditorium)
WHERE m4.title = "Stand By Me" AND a4.number = 1
CREATE (m4)<-[:PLAYS]-(:Screening {date: "2024-01-01", time: "18:00"})-[:IS_IN]->(a4);

MATCH (m5:Movie), (a5:Auditorium)
WHERE m5.title = "The Matrix" AND a5.number = 2
CREATE (m5)<-[:PLAYS]-(:Screening {date: "2024-01-01", time: "20:00"})-[:IS_IN]->(a5);

MATCH (m6:Movie), (a6:Auditorium)
WHERE m6.title = "Top Gun" AND a6.number = 3
CREATE (m6)<-[:PLAYS]-(:Screening {date: "2024-01-02", time: "12:00"})-[:IS_IN]->(a6);

MATCH (m7:Movie), (a7:Auditorium)
WHERE m7.title = "Few Good Man" AND a7.number = 1
CREATE (m7)<-[:PLAYS]-(:Screening {date: "2024-01-02", time: "14:00"})-[:IS_IN]->(a7);

MATCH (m8:Movie), (a8:Auditorium)
WHERE m8.title = "Stand By Me" AND a8.number = 2
CREATE (m8)<-[:PLAYS]-(:Screening {date: "2024-01-02", time: "16:00"})-[:IS_IN]->(a8);

MATCH (m9:Movie), (a9:Auditorium)
WHERE m9.title = "The Matrix" AND a9.number = 3
CREATE (m9)<-[:PLAYS]-(:Screening {date: "2024-01-02", time: "18:00"})-[:IS_IN]->(a9);

MATCH (m10:Movie), (a10:Auditorium)
WHERE m10.title = "Top Gun" AND a10.number = 1
CREATE (m10)<-[:PLAYS]-(:Screening {date: "2024-01-02", time: "20:00"})-[:IS_IN]->(a10);

MATCH (m11:Movie), (a11:Auditorium)
WHERE m11.title = "Few Good Man" AND a11.number = 2
CREATE (m11)<-[:PLAYS]-(:Screening {date: "2024-01-03", time: "12:00"})-[:IS_IN]->(a11);

MATCH (m12:Movie), (a12:Auditorium)
WHERE m12.title = "Stand By Me" AND a12.number = 3
CREATE (m12)<-[:PLAYS]-(:Screening {date: "2024-01-03", time: "14:00"})-[:IS_IN]->(a12);

MATCH (m13:Movie), (a13:Auditorium)
WHERE m13.title = "The Matrix" AND a13.number = 1
CREATE (m13)<-[:PLAYS]-(:Screening {date: "2024-01-03", time: "14:00"})-[:IS_IN]->(a13);

MATCH (m14:Movie), (a14:Auditorium)
WHERE m14.title = "Top Gun" AND a14.number = 2
CREATE (m14)<-[:PLAYS]-(:Screening {date: "2024-01-03", time: "16:00"})-[:IS_IN]->(a14);

