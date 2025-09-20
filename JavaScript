// Sample Test Case 1
const testCase1 = {
  "keys": {
    "n": 4,
    "k": 3
  },
  "1": {
    "base": "10",
    "value": "4"
  },
  "2": {
    "base": "2",
    "value": "111"
  },
  "3": {
    "base": "10",
    "value": "12"
  },
  "6": {
    "base": "4",
    "value": "213"
  }
};

// Sample Test Case 2 (your big JSON)
const testCase2 = {
  "keys": {
    "n": 10,
    "k": 7
  },
  "1": {
    "base": "6",
    "value": "13444211440455345511"
  },
  "2": {
    "base": "15",
    "value": "aed7015a346d635"
  },
  "3": {
    "base": "15",
    "value": "6aeeb69631c227c"
  },
  "4": {
    "base": "16",
    "value": "e1b5e05623d881f"
  },
  "5": {
    "base": "8",
    "value": "316034514573652620673"
  },
  "6": {
    "base": "3",
    "value": "2122212201122002221120200210011020220200"
  },
  "7": {
    "base": "3",
    "value": "20120221122211000100210021102001201112121"
  },
  "8": {
    "base": "6",
    "value": "20220554335330240002224253"
  },
  "9": {
    "base": "12",
    "value": "45153788322a1255483"
  },
  "10": {
    "base": "7",
    "value": "1101613130313526312514143"
  }
};


// Base-N to BigInt converter (works up to base 36)
function baseNToBigInt(str, base) {
  const digits = '0123456789abcdefghijklmnopqrstuvwxyz';
  let result = 0n;
  for (const ch of str) {
    const val = BigInt(digits.indexOf(ch));
    if (val < 0 || val >= BigInt(base)) {
      throw new Error(`Invalid digit '${ch}' for base ${base}`);
    }
    result = result * BigInt(base) + val;
  }
  return result;
}

// Function to calculate constant term c for a test case object
function calculateConstantTerm(data) {
  const n = data.keys.n;
  const roots = [];

  for (let i = 1; i <= n; i++) {
    const entry = data[i.toString()];
    if (!entry) continue;

    const base = parseInt(entry.base);
    const valueStr = entry.value.toLowerCase();

    const decimalValue = baseNToBigInt(valueStr, base);
    roots.push(decimalValue);
  }

  const sign = (roots.length % 2 === 0) ? 1n : -1n;
  const product = roots.reduce((acc, val) => acc * val, 1n);
  const c = sign * product;

  return c.toString();
}

// Process and print results for both test cases
console.log("Test Case 1 Constant term c:", calculateConstantTerm(testCase1));
console.log("Test Case 2 Constant term c:", calculateConstantTerm(testCase2));
