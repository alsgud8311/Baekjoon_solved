const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const [a, ans, ...rest] = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");

const [N, M] = a.split(" ").map(Number);
const ANS = ans.split(" ").map(Number);
const models = rest.map((r) => r.split(" ").map(Number));

function solve() {
    // Find maximum correct predictions from single models
    const MAX_CORRECT = Math.max(...models.map(model => 
        model.reduce((sum, pred, i) => sum + (1 - (pred ^ ANS[i])), 0)
    ));

    // Generate all possible combinations for odd numbers of models
    for (let choose = 1; choose <= N; choose += 2) {
        // Generate combinations using indices
        const indices = Array.from({length: N}, (_, i) => i);
        const combinations = getCombinations(indices, choose);

        for (const comb of combinations) {
            const ensemble = new Array(M).fill(0);
            
            // For each question
            for (let i = 0; i < M; i++) {
                let countZero = 0;
                let countOne = 0;
                
                // Count votes from selected models
                for (const modelIdx of comb) {
                    if (models[modelIdx][i] === 0) countZero++;
                    else countOne++;
                }
                
                // Majority voting
                if (countZero < countOne) {
                    ensemble[i] = 1;
                }
            }

            // Calculate correctness
            const correctCount = ensemble.reduce((sum, pred, i) => 
                sum + (1 - (pred ^ ANS[i])), 0
            );

            if (correctCount > MAX_CORRECT) {
                console.log(1);
                return;
            }
        }
    }
    
    console.log(0);
}

// Helper function to generate combinations
function getCombinations(arr, r) {
    if (r === 1) return arr.map(val => [val]);
    
    const result = [];
    for (let i = 0; i <= arr.length - r; i++) {
        const combinations = getCombinations(arr.slice(i + 1), r - 1);
        combinations.forEach(combination => {
            result.push([arr[i], ...combination]);
        });
    }
    return result;
}

solve();