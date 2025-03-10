# Use a base image with Java runtime
FROM openjdk:22-jdk-slim

# Set working directory inside the container
WORKDIR /app

# Copy built JAR file from target directory
COPY target/gateway-*.jar app.jar

# Expose the port the service runs on
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
