FROM openjdk:22-jdk-slim

WORKDIR /app

COPY target/product-catalog-service-*.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]
