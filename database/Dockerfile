FROM postgres:alpine
# logging folder for postgres
RUN mkdir -p /logs
RUN chown -R postgres:postgres /logs
RUN chmod -R 777 /logs
# make Postgres log to a file
CMD ["postgres", "-c", "logging_collector=on", "-c" ,"log_destination=stderr", "-c", "log_directory=/logs"]