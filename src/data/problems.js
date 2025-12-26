export const DUMMY_PROBLEMS = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    title: `Problem ${i + 1}: Two Sum ${Math.floor(i / 5) + 1}`,
    difficulty: ['Easy', 'Medium', 'Hard'][i % 3],
    category: ['Array', 'String', 'DP'][i % 3],
    description: `
# Problem ${i + 1}

Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers.

\`\`\`
Input: [2,7,11,15], target = 9
Output: [0,1]
\`\`\`
`
}));
