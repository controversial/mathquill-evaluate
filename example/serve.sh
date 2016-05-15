pwdname=${PWD##*/} # From http://stackoverflow.com/q/1371261/4414003

if [[ $pwdname -eq "example" ]] # We are inside the 'example' directory
then
  cd ..
fi

php -S localhost:8080 build/request.php
