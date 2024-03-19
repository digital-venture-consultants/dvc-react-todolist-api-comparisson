# Verwende das offizielle Maven-Image als Basis
FROM maven:3.8.4-openjdk-17-slim AS builder

# Setze das Arbeitsverzeichnis im Container
WORKDIR /app

# Kopiere die Maven-Projektdefinitionen und den Quellcode in das Arbeitsverzeichnis
COPY pom.xml .
COPY src ./src

# Baue das Maven-Projekt
RUN mvn clean install -DskipTests

# Verwende das OpenJDK-Image von Zulu als Basis für die Ausführungsumgebung
FROM azul/zulu-openjdk:17 AS run

# Setze das Arbeitsverzeichnis im Container
WORKDIR /app

# Kopiere die JAR-Datei aus dem Build-Container in das Arbeitsverzeichnis im Ausführungscontainer
COPY --from=builder /app/target/*.jar app.jar

# Definiere den Befehl, der beim Start des Containers ausgeführt wird
CMD ["java", "-jar", "app.jar"]
