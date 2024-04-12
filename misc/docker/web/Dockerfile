FROM ruby:3.1

# throw errors if Gemfile has been modified since Gemfile.lock
# RUN bundle config --global frozen 1

WORKDIR /usr/src/app

COPY Gemfile Gemfile.lock ./
RUN bundle --path=vendor/bundle --without=development:test --jobs=4 --retry=3

COPY . .
# FIX: https://github.com/tdtds/takuhai_status/pull/31
COPY misc/fix/fedex.rb vendor/bundle/ruby/3.1.0/gems/takuhai_status-1.9.2/lib/takuhai_status/

ENV RACK_ENV=production
ENV TZ=Asia/Tokyo
ENV MONGODB_URI=mongodb://mongodb:27017/takuhai_tracker

CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]