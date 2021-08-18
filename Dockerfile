FROM rubylang/ruby:2.5

RUN apt-get update && apt-get install -y vim nodejs

WORKDIR /var/www

RUN gem install bundler
RUN gem install middleman

EXPOSE 4567
