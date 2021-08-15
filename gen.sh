#!/usr/bin/env bash

target="mds"
count=0
echo "#AU Covid-19 Update" > README.md
for f in "$target"/*
do
    echo $f
    if [[ ${f} != *"test"* ]]; then
        cat "$f" >> README.md
    fi
    count=$((count+1))
done
echo ""
echo "Count: $count"