FROM openjdk:22-jdk-slim

WORKDIR /app

COPY target/inventory-service-*.jar app.jar

EXPOSE 8082

ENTRYPOINT ["java", "-jar", "app.jar"]
