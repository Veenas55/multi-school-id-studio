# Stage 1: Build the Spring Boot application
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml and source code
COPY pom.xml .
COPY src ./src

# Build the executable JAR without running tests
RUN mvn clean package -DskipTests

# Stage 2: Create a lightweight runtime container
FROM eclipse-temurin:17-jre
WORKDIR /app

# Expose the server port
EXPOSE 8080

# Copy the built JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Run the Spring Boot application
ENTRYPOINT ["java", "-Dserver.port=${PORT:-8080}", "-jar", "app.jar"]
