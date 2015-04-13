#!/bin/bash
view_name="View"
path_src=./templates/styles
path_dst=./templates/temp
dirname=$path_dst/$view_name

mkdir ./$dirname

for file_src in $path_src/*; do
  file_dst="$dirname/$(basename $file_src | \
    sed "s/^\(.*\)\.\(.*\)/\1$date.\2/")"
  echo Stylesheets created into "$file_dst"
  cp "$file_src" "$file_dst"
done



