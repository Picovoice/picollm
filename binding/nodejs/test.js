const { execSync } = require('node:child_process');
const fs = require('node:fs');

async function main() {
    const args = process.argv.slice(2);

    fs.rmSync('./dist_test', {
        recursive: true,
        force: true,
    });

    execSync('yarn run tsc -p tsconfig-test.json', { stdio: 'inherit' });

    for (const parameter_path of fs.readdirSync("test")) {
        if (parameter_path.endsWith(".pllm")) {
            fs.cpSync(`test/${parameter_path}`, `dist_test/binding/nodejs/test/${parameter_path}`);
            console.log(`${parameter_path} copied.`);
        }
    }

    fs.cpSync("lib/", "dist_test/binding/nodejs/lib/", { recursive: true });
    console.log("lib copied.");

    fs.cpSync("../../resources/.test/images/", "dist_test/resources/.test/images/", { recursive: true });
    console.log("./../resources/.test/images copied.");

    execSync(`yarn run jest --config jest-test.config.js --no-cache --detectOpenHandles ${args.join(" ")}`, { stdio: 'inherit' });
}

main();