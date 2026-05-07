rm dist -rf

yarn run tsc -p tsconfig-test.json

cp test/*.pllm dist_test/binding/nodejs/test/
cp -r lib dist_test/binding/nodejs/
cp -r ../../resources/.test/images dist_test/resources/.test/

yarn run jest --config jest-test.config.js --no-cache --detectOpenHandles "$@"