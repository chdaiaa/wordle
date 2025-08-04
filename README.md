# README

Website Wordle Game

## Local Setup

if you are using windows, follow steps below to set up linux os:
- install windows linux system with `wsl --install --distribution Ubuntu-24.04`
- install and update basic development config/dependency:
  ```
  sudo apt update
  sudo apt install build-essential rustc libssl-dev libyaml-dev zlib1g-dev libgmp-dev
  ```
- Install mise for ruby version manager
  ```
  curl https://mise.run | sh
  echo 'eval "$(~/.local/bin/mise activate bash)"' >> ~/.bashrc
  source ~/.bashrc
  ```

if you are using mac, follow steps below to set up brew package:
- run `brew doctor` to check and fix all local dependency issue
- Install mise with `brew install mise`

### Project Setup

- Install node `mise install node@lts` and then `mise use -g node@lts`
- install ruby: `mise install ruby@3.4.5` and then `mise use -g ruby@3.4.5`
- install rails: `gem install rails`
- install yarn package: `sudo npm install -g yarn`
- verify yarn version: `yarn --version`
- install project dependency: `bundle; yarn;`