
To add a migration:

> dotnet ef migrations add <MigrationName> -p ./Persistence -s ./api


To install postgresql:

> docker run --name postgresql -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres:latest


https://github.com/jincod/dotnetcore-buildpack
heroku buildpacks:set --index 1 heroku/nodejs

https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-nodejs#buildpack-instructions