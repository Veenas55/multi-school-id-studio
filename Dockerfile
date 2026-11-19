# Stage 1: Build the backend from repository root
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy backend pom and source code
COPY backend/pom.xml .
COPY backend/src ./src

# Build JAR
RUN mvn clean package -DskipTests

# Stage 2: Minimal runtime image
FROM eclipse-temurin:17-jre
WORKDIR /app
EXPOSE 8080

COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java", "-Dserver.port=${PORT:-8080}", "-jar", "app.jar"]
