# syntax=docker/dockerfile:1

FROM openjdk:19-jdk

COPY target/EMIFlights-0.0.1-SNAPSHOT.jar EMIFlights-0.0.1-SNAPSHOT.jar

# Run the jar file 
ENTRYPOINT ["java","-jar","/EMIFlights-0.0.1-SNAPSHOT.jar"]

EXPOSE 8081 
ENV PORT 8081