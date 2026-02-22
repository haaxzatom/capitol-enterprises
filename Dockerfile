FROM ubuntu:22.04

# Set working directory
WORKDIR /build

# Install dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    curl \
    wget \
    unzip \
    openjdk-11-jdk-headless \
    lib32stdc++6 \
    libncurses5 \
    && rm -rf /var/lib/apt/lists/*

# Download and set up Android SDK
ENV ANDROID_SDK_ROOT=/opt/android-sdk
ENV PATH=${PATH}:${ANDROID_SDK_ROOT}/cmdline-tools/latest/bin:${ANDROID_SDK_ROOT}/platform-tools

RUN mkdir -p ${ANDROID_SDK_ROOT} && \
    wget -q https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip -O /tmp/android-sdk.zip && \
    unzip -q /tmp/android-sdk.zip -d ${ANDROID_SDK_ROOT} && \
    ln -s ${ANDROID_SDK_ROOT}/cmdline-tools/cmdline-tools ${ANDROID_SDK_ROOT}/cmdline-tools/latest && \
    rm /tmp/android-sdk.zip

# Accept Android licenses
RUN yes | sdkmanager --licenses 2>/dev/null || true && \
    sdkmanager "platform-tools" "build-tools;35.0.0" "platforms;android-36" "tools"

# Clone and setup Flutter (stable channel)
RUN git clone https://github.com/flutter/flutter.git /opt/flutter --branch stable --depth=1
ENV PATH=${PATH}:/opt/flutter/bin

# Precache Flutter
RUN flutter config --no-analytics && \
    flutter doctor

# Copy the Capitol Enterprises app
COPY capitol-flutter /build/app

WORKDIR /build/app

# Get Flutter dependencies
RUN flutter pub get

# Build APK
RUN flutter build apk --debug

# Create output directory
RUN mkdir -p /output && \
    cp build/app/outputs/flutter-apk/app-debug.apk /output/ && \
    apt-get clean

# Optional: build release APK (comment out for faster builds)
# RUN flutter build apk --release && cp build/app/outputs/flutter-apk/app-release.apk /output/

VOLUME ["/output"]

CMD ["/bin/bash"]
