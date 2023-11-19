# Detect your machine's architecture and set it as $OSARCH
OSARCH=$(uname -m | awk '{if ($0 ~ /arm64|aarch64/) print "arm64"; else if ($0 ~ /x86_64|amd64/) print "amd64"; else print "unsupported_arch"}') && export OSARCH
# Detect your operating system and set it as $OSNAME
OSNAME=$(uname -s | awk '{if ($1 == "Darwin") print "darwin"; else if ($1 == "Linux") print "linux"; else print "unsupported_os"}') && export OSNAME;
# Download the latest production build
curl -L -o lilypad https://github.com/bacalhau-project/lilypad/releases/download/v2.0.0-f7fdc27/lilypad-$OSNAME-$OSARCH
# Make Lilypad executable and install it
chmod +x lilypad
sudo mv lilypad /usr/local/bin/lilypad

if [ "$SHELL" = "/bin/bash" ]; then
    # It's bash
    source .env.bash
elif [ "$SHELL" = "/usr/bin/fish" ]; then
    # It's fish
    source .env.fish
else
    echo "Unsupported shell."
fi

pip3 install -r requirements.txt
