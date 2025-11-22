import readline from 'readline';
import { generateMatrix } from './generate-content-matrix';
import { generatePageMatrix } from './pageMatrix';
import { buildMatrix } from './build_content_matrix';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showMenu() {
    console.log('\n--- Content Management System ---');
    console.log('1. Analyze Potential Pages (Generate Content Matrix)');
    console.log('2. Prepare Execution Plan (Generate Page Matrix)');
    console.log('3. Audit Generated Content (Build Matrix Report)');
    console.log('4. Exit');
    rl.question('Select an option: ', handleInput);
}

async function handleInput(answer: string) {
    switch (answer.trim()) {
        case '1':
            console.log('\n--- Analyzing Potential Pages ---');
            await generateMatrix();
            break;
        case '2':
            console.log('\n--- Preparing Execution Plan ---');
            await generatePageMatrix();
            break;
        case '3':
            console.log('\n--- Auditing Generated Content ---');
            await buildMatrix();
            break;
        case '4':
            console.log('Exiting...');
            rl.close();
            process.exit(0);
            return;
        default:
            console.log('Invalid option. Please try again.');
    }
    showMenu();
}

console.log('Welcome to the Content Management Admin Tool.');
showMenu();
