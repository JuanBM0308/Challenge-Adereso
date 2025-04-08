// TODO: Archivo principal 'runner'
import { getProblemTest } from "./apiHelperTest.js";
import { interpretProblemWithAI } from "./aiHelper.js";

async function executeChallenge() {
    const problem = await getProblemTest();

    if (problem) {
        const aiData = await interpretProblemWithAI(problem);
        console.log('Respusta de la IA:', aiData);
    }
}

executeChallenge();