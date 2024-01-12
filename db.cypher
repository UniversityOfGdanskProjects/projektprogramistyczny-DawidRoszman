# creating auditoriums and filling them with seats

CREATE (:Auditorium {number: 1});
CREATE (:Auditorium {number: 2});
CREATE (:Auditorium {number: 3});
MATCH (a:Auditorium {number: 1}) WITH a
CREATE (a)-[:HAS]->(:Seat {id: "cd1fe0f6-0d5f-4858-bf6e-32b66d03d8f7", row: 1, column: 1, vip: false})
CREATE (a)-[:HAS]->(:Seat {id: "d22b5dd7-7ef2-4442-9b05-e5b7364f6878", row: 1, column: 2, vip: false})
CREATE (a)-[:HAS]->(:Seat {id: "a0c42112-392a-4238-8175-5f116498ec9b", row: 1, column: 3, vip: false})
CREATE (a)-[:HAS]->(:Seat {id: "afdaf28d-9db4-4c57-a93c-e8627bc42c64", row: 2, column: 1, vip: true})
CREATE (a)-[:HAS]->(:Seat {id: "4b6e4f63-1791-47b2-98c8-74f4a3871bac", row: 2, column: 2, vip: true})
CREATE (a)-[:HAS]->(:Seat {id: "7b84133e-2574-4a14-85d2-62f087c02fc4", row: 2, column: 3, vip: true})
CREATE (a)-[:HAS]->(:Seat {id: "daed3373-f3f6-4b6d-8e54-953b412b7af3", row: 3, column: 1, vip: false})
CREATE (a)-[:HAS]->(:Seat {id: "4921cc6a-45ba-4384-a176-aea7f7a110b0", row: 3, column: 2, vip: false})
CREATE (a)-[:HAS]->(:Seat {id: "ddca8a63-9e77-4c30-a54a-4f854f5e3adc", row: 3, column: 3, vip: false});

MATCH (a:Auditorium {number: 2}) WITH a
CREATE (a)-[:HAS]->(:Seat {id: "0fb6a81d-8705-4e51-b318-b8a2d42fb263", row: 1, column: 1, vip: false})
CREATE (a)-[:HAS]->(:Seat {id: "48ee0c91-d833-4f99-aad2-0099f2e1cb0f", row: 1, column: 2, vip: false})
CREATE (a)-[:HAS]->(:Seat {id: "58bd3744-c5aa-49ab-872e-475e4380d13d", row: 1, column: 3, vip: false})
CREATE (a)-[:HAS]->(:Seat {id: "35f8cf27-7f5c-4391-8196-a0e912ff1e24", row: 2, column: 1, vip: true})
CREATE (a)-[:HAS]->(:Seat {id: "51e2b907-206b-43da-9c80-185930b98108", row: 2, column: 2, vip: true})
CREATE (a)-[:HAS]->(:Seat {id: "db3916b4-84f6-4061-8cec-88693874522d", row: 2, column: 3, vip: true})
CREATE (a)-[:HAS]->(:Seat {id: "9f3c2526-c251-40c2-9731-941c2009f299", row: 3, column: 1, vip: false})
CREATE (a)-[:HAS]->(:Seat {id: "4be1910f-c3b3-43f0-9018-75d9a63839c1", row: 3, column: 2, vip: false})
CREATE (a)-[:HAS]->(:Seat {id: "ba9310fc-3d68-4c96-9333-3e9d837c8106", row: 3, column: 3, vip: false});

MATCH (a:Auditorium {number: 3}) WITH a
CREATE (a)-[:HAS]->(:Seat {id: "a07732fe-b9a1-4200-a574-c14f6b7b4fe5", row: 1, column: 1, vip: false})
CREATE (a)-[:HAS]->(:Seat {id: "120ac1c5-88f7-4bc1-b5c6-d6ac50bf41f5", row: 1, column: 2, vip: false})
CREATE (a)-[:HAS]->(:Seat {id: "e859d635-b865-425b-8fc0-ed7166be2706", row: 1, column: 3, vip: false})
CREATE (a)-[:HAS]->(:Seat {id: "0bbbd5f2-6948-449e-985a-78c4f2f053b6", row: 2, column: 1, vip: true})
CREATE (a)-[:HAS]->(:Seat {id: "0044004a-1659-456b-93af-e261707e8fe7", row: 2, column: 2, vip: true})
CREATE (a)-[:HAS]->(:Seat {id: "6c2dcb96-4955-4983-92ae-e0acb384f846", row: 2, column: 3, vip: true})
CREATE (a)-[:HAS]->(:Seat {id: "d060a5e8-3bd0-4ff9-834b-dfe30c6db965", row: 3, column: 1, vip: false})
CREATE (a)-[:HAS]->(:Seat {id: "c6591255-4393-4b3e-9663-f642fa761971", row: 3, column: 2, vip: false})
CREATE (a)-[:HAS]->(:Seat {id: "badb5b97-b688-4017-89de-e35bea041936", row: 3, column: 3, vip: false});

# creating screenings
MATCH (m1:Movie), (a1:Auditorium)
WHERE m1.title = "The Matrix" AND a1.number = 1
CREATE (m1)<-[:PLAYS]-(:Screening {id: "4e28d143-74c7-41bb-9b55-6fb8093302ce", date: datetime("2024-01-01T10:00:00.00+0100")})-[:IS_IN]->(a1);

MATCH (m2:Movie), (a2:Auditorium)
WHERE m2.title = "Top Gun" AND a2.number = 2
CREATE (m2)<-[:PLAYS]-(:Screening {id: "f100c69e-4f21-42c1-ba86-b7090239d170", date: datetime("2024-01-01T12:00:00.00+0100")})-[:IS_IN]->(a2);

MATCH (m3:Movie), (a3:Auditorium)
WHERE m3.title = "Few Good Man" AND a3.number = 3
CREATE (m3)<-[:PLAYS]-(:Screening {id: "46c9d5cc-0dc7-4a8a-9fb0-5f9ce2e71bf2", date: datetime("2024-01-01T14:00:00.00+0100")})-[:IS_IN]->(a3);

MATCH (m4:Movie), (a4:Auditorium)
WHERE m4.title = "Stand By Me" AND a4.number = 1
CREATE (m4)<-[:PLAYS]-(:Screening {id: "467b7b69-4eb4-4794-99b5-3fbcc50cadd0", date: datetime("2024-01-02T10:00:00.00+0100")})-[:IS_IN]->(a4);

MATCH (m5:Movie), (a5:Auditorium)
WHERE m5.title = "The Matrix" AND a5.number = 2
CREATE (m5)<-[:PLAYS]-(:Screening {id: "d79fd9d7-96f1-4559-996a-3068ab1b8f6d", date: datetime("2024-02-01T12:00:00.00+0100")})-[:IS_IN]->(a5);

MATCH (m6:Movie), (a6:Auditorium)
WHERE m6.title = "Top Gun" AND a6.number = 3
CREATE (m6)<-[:PLAYS]-(:Screening {id: "11ba8239-8338-491e-bbd6-6128e45c206b", date: datetime("2024-02-01T10:00:00.00+0100")})-[:IS_IN]->(a6);

MATCH (m7:Movie), (a7:Auditorium)
WHERE m7.title = "Few Good Man" AND a7.number = 1
CREATE (m7)<-[:PLAYS]-(:Screening {id: "219fddf5-d9db-46ce-a00e-66c0b971c183", date: datetime("2024-02-01T10:00:00.00+0100")})-[:IS_IN]->(a7);

MATCH (m8:Movie), (a8:Auditorium)
WHERE m8.title = "Stand By Me" AND a8.number = 2
CREATE (m8)<-[:PLAYS]-(:Screening {id: "0170b186-6e60-4c1f-bd33-e1aaf5cccab5", date: datetime("2024-03-01T10:00:00.00+0100")})-[:IS_IN]->(a8);

MATCH (m9:Movie), (a9:Auditorium)
WHERE m9.title = "The Matrix" AND a9.number = 3
CREATE (m9)<-[:PLAYS]-(:Screening {id: "c8de882a-5d0d-45a2-905c-c78e8ee42a3f", date: datetime("2024-03-01T10:00:00.00+0100")})-[:IS_IN]->(a9);

MATCH (m10:Movie), (a10:Auditorium)
WHERE m10.title = "Top Gun" AND a10.number = 1
CREATE (m10)<-[:PLAYS]-(:Screening {id: "cc812f25-e5b3-4991-9745-486e1622a30a", date: datetime("2024-03-01T10:00:00.00+0100")})-[:IS_IN]->(a10);

MATCH (m11:Movie), (a11:Auditorium)
WHERE m11.title = "Few Good Man" AND a11.number = 2
CREATE (m11)<-[:PLAYS]-(:Screening {id: "865c262f-9229-4dbe-84e3-9a4478574f0a", date: datetime("2024-03-01T10:00:00.00+0100")})-[:IS_IN]->(a11);

MATCH (m12:Movie), (a12:Auditorium)
WHERE m12.title = "Stand By Me" AND a12.number = 3
CREATE (m12)<-[:PLAYS]-(:Screening {id: "a969da5e-508c-4642-89ea-9a96513d8e43", date: datetime("2024-03-01T10:00:00.00+0100")})-[:IS_IN]->(a12);

MATCH (m13:Movie), (a13:Auditorium)
WHERE m13.title = "The Matrix" AND a13.number = 1
CREATE (m13)<-[:PLAYS]-(:Screening {id: "20b5b227-7967-473e-9362-a7935fd3476c", date: datetime("2024-04-01T10:00:00.00+0100")})-[:IS_IN]->(a13);

MATCH (m14:Movie), (a14:Auditorium)
WHERE m14.title = "Top Gun" AND a14.number = 2
CREATE (m14)<-[:PLAYS]-(:Screening {id: "986c41fb-fe59-412f-8c8d-247240be08c4", date: datetime("2024-04-01T10:00:00.00+0100")})-[:IS_IN]->(a14);

