# syntax=docker/dockerfile:1
FROM ubuntu:21.04
RUN apt -y update
RUN curl -sL https://deb.nodesource.com/setup_16.x  | bash -
RUN apt -y install git ruby-full build-essential zlib1g-dev curl gnupg nodejs
RUN gem install 'bundler:1.13.1' jekyll
RUN mkdir /home/app
WORKDIR /home/app
COPY Gemfile* ./
RUN bundler install
CMD ["tail", "-f", "/dev/null"]

