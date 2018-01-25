study-graph-angular
===================

Simple scaffold generated with `@angular/cli` then implemented manually.

## Update version

    sed -i "/this.serverStatus =/c\    this.serverStatus = {version: 'App $(jq -r .version package.json); '};" src/app/server-status/server-status.component.ts

## Deploy distribution
Clone [study-graph-dist](https://github.com/SamuelMarks/study-graph-dist) one directory above, then:

    rm -rf dist; ng build -prod && d=../study-graph-dist && rm -rf "$d/dist" && mv "$PWD/dist" "$d" && cd "$d" && (git add .; git status) || ( >&2 echo BUILD FAILED )
