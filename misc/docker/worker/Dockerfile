#
# Dockerfile for Takuhai Tracker worker process
#
# need some ENVs:
#   MONGODB_URI
#
FROM ruby:3.1
LABEL maintainer "@tdtds <t@tdtds.jp>"

RUN apt update && apt install -y busybox-static; \
    mkdir -p /app/takuhai-tracker; \
	 mkdir -p /var/spool/cron/crontabs
COPY ["misc/docker/worker/crontab", "/var/spool/cron/crontabs/root"]
COPY ["Gemfile", "Gemfile.lock", "/app/takuhai-tracker/"]

WORKDIR /app/takuhai-tracker
RUN bundle --path=vendor/bundle --without=development:test --jobs=4 --retry=3
COPY [".", "/app/takuhai-tracker/"]
# FIX: https://github.com/tdtds/takuhai_status/pull/31
COPY misc/fix/fedex.rb vendor/bundle/ruby/3.1.0/gems/takuhai_status-1.9.2/lib/takuhai_status/

ENV RACK_ENV=production
ENV TZ=Asia/Tokyo
ENV MONGODB_URI=mongodb://mongodb:27017/takuhai_tracker

CMD ["busybox", "crond", "-L", "/dev/stderr", "-f"]
