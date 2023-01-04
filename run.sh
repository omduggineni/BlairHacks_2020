#!/bin/sh

rm -rvf BlairHacks_2020;
git clone https://github.com/OmDuggineni/BlairHacks_2020.git;
cat /site/public/BlairHacks_2020/run.sh > /site/run.sh;
cd BlairHacks_2020;
npm run start > /site/server.log;
