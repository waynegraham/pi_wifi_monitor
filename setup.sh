#!/bin/sh

set -e

green=$(tput setaf 2)
normal=$(tput sgr0)

fancy_echo() {
  local fmt="$1"; shift

  # shellcheck disable=SC2059
  printf "${green}\\n$fmt\\n${normal}" "$@"
}

fancy_echo "Updating the operating system..."
sudo apt update
sudo apt upgrade

fancy_echo "Ensuring the dependencies are installed..."
sudo apt install python3 git apache2

fancy_echo "Cloning software from GitHub..."
if [ ! -d "$HOME/pi_wifi_monitor"]
  cd "$HOME"
  git clone https://github.com/waynegraham/pi_wifi_monitor.git
fi

wget https://docs.google.com/uc?id=0B3X9GlR6EmbnVXNLanp4ZFRRbzg&export=download .
