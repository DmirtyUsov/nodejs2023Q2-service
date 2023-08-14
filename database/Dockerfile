FROM postgres:alpine
# logging folder for postgres
RUN mkdir -p ./log
RUN chown -R postgres:postgres ./log
RUN chmod -R 700 ./log
# make Postgres log to a file
CMD ["postgres", "-c", "logging_collector=on", "-c" ,"log_destination=stderr", "-c", "log_directory=./log"]