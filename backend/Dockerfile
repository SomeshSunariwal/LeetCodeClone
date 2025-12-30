# ----------------------------------------------------
# UNIVERSAL LANGUAGE EXECUTION + FORMATTER CONTAINER
# Supports: C, C++, Python, Java, JavaScript
# ----------------------------------------------------

FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

# -----------------------------
# Install system dependencies
# -----------------------------
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    clang-format \
    python3 \
    python3-pip \
    openjdk-17-jdk \
    curl \
    npm \
    && apt-get clean

# -----------------------------
# Install Python formatter
# -----------------------------
RUN pip3 install --no-cache-dir black

# -----------------------------
# Install JavaScript formatter
# -----------------------------
RUN npm install -g prettier

# -----------------------------
# Install Java formatter
# -----------------------------
RUN curl -L https://github.com/google/google-java-format/releases/download/v1.17.0/google-java-format-1.17.0-all-deps.jar \
    -o /usr/local/bin/google-java-format.jar

# -----------------------------
# Create working directory
# -----------------------------
WORKDIR /app

# -----------------------------
# Copy entry script
# -----------------------------
COPY entry.sh /usr/local/bin/entry.sh
RUN chmod +x /usr/local/bin/entry.sh

# -----------------------------
# Default entry point
# -----------------------------
ENTRYPOINT ["entry.sh"]
