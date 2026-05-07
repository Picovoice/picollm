rm dist -rf

yarn run tsc -p tsconfig-test.json

cp test/*.pllm dist/binding/nodejs/test/
cp -r lib dist/binding/nodejs/
cp -r ../../resources/.test/images dist/resources/.test/

yarn run jest --config jest-test.config.js --no-cache --detectOpenHandles "$@"