/**
 * Dyscalculia Math Solver & Cognitive Decomposition Engine
 * Breaks arithmetic operations into spatial, step-by-step, and place-value models.
 */

export function parseEquation(inputStr) {
  const clean = (inputStr || '24 + 18').replace(/\s+/g, '').replace(/x/gi, '*');
  const match = clean.match(/^(\d+)([+\-*])(\d+)$/);

  if (!match) {
    // Default fallback equation
    return { num1: 24, num2: 18, operator: '+' };
  }

  return {
    num1: parseInt(match[1], 10),
    operator: match[2],
    num2: parseInt(match[3], 10),
  };
}

export function decomposePlaceValue(num) {
  const hundreds = Math.floor((num % 1000) / 100);
  const tens = Math.floor((num % 100) / 10);
  const ones = num % 10;

  const parts = [];
  if (hundreds > 0) parts.push(`${hundreds * 100}`);
  if (tens > 0) parts.push(`${tens * 10}`);
  if (ones > 0 || parts.length === 0) parts.push(`${ones}`);

  return {
    hundreds,
    tens,
    ones,
    expandedString: parts.join(' + '),
  };
}

export function solveMathProblem(input) {
  const { num1, operator, num2 } = typeof input === 'string' ? parseEquation(input) : input;

  let result = 0;
  if (operator === '+') result = num1 + num2;
  else if (operator === '-') result = Math.max(0, num1 - num2);
  else if (operator === '*') result = num1 * num2;

  const pv1 = decomposePlaceValue(num1);
  const pv2 = decomposePlaceValue(num2);
  const pvResult = decomposePlaceValue(result);

  const steps = [];
  const numberLineJumps = [];

  if (operator === '+') {
    const tens2 = pv2.tens * 10;
    const ones2 = pv2.ones;
    const hundreds2 = pv2.hundreds * 100;

    let current = num1;

    // Step 0: Starting Anchor
    steps.push({
      stepNumber: 1,
      title: `Start at ${num1}`,
      explanation: `Anchor your mental focus at the starting number: ${num1}.`,
      actionLabel: `Start = ${num1}`,
      currentValue: current,
      highlightType: 'start',
    });

    // Step 1: Add hundreds if applicable
    if (hundreds2 > 0) {
      const next = current + hundreds2;
      steps.push({
        stepNumber: steps.length + 1,
        title: `Add Hundreds (+${hundreds2})`,
        explanation: `Jump forward by ${hundreds2} (large hundred-leap): ${current} + ${hundreds2} = ${next}.`,
        actionLabel: `+${hundreds2}`,
        currentValue: next,
        highlightType: 'hundreds',
      });
      numberLineJumps.push({
        from: current,
        to: next,
        amount: hundreds2,
        direction: 'forward',
        label: `+${hundreds2}`,
        color: 'text-indigo-400',
      });
      current = next;
    }

    // Step 2: Add tens
    if (tens2 > 0) {
      const next = current + tens2;
      steps.push({
        stepNumber: steps.length + 1,
        title: `Add Tens (+${tens2})`,
        explanation: `Jump forward by ${tens2} (tens stride): ${current} + ${tens2} = ${next}.`,
        actionLabel: `+${tens2}`,
        currentValue: next,
        highlightType: 'tens',
      });
      numberLineJumps.push({
        from: current,
        to: next,
        amount: tens2,
        direction: 'forward',
        label: `+${tens2}`,
        color: 'text-emerald-400',
      });
      current = next;
    }

    // Step 3: Add ones
    if (ones2 > 0 || (tens2 === 0 && hundreds2 === 0)) {
      const next = current + ones2;
      steps.push({
        stepNumber: steps.length + 1,
        title: `Add Remaining Ones (+${ones2})`,
        explanation: `Hop forward by the remaining ${ones2} single units: ${current} + ${ones2} = ${next}.`,
        actionLabel: `+${ones2}`,
        currentValue: next,
        highlightType: 'ones',
      });
      numberLineJumps.push({
        from: current,
        to: next,
        amount: ones2,
        direction: 'forward',
        label: `+${ones2}`,
        color: 'text-amber-400',
      });
      current = next;
    }

    // Final Landing Step
    steps.push({
      stepNumber: steps.length + 1,
      title: `Final Destination: ${result}`,
      explanation: `You reached the destination! Therefore, ${num1} + ${num2} = ${result}.`,
      actionLabel: `Result = ${result}`,
      currentValue: result,
      highlightType: 'finish',
    });
  } else if (operator === '-') {
    const tens2 = pv2.tens * 10;
    const ones2 = pv2.ones;
    const hundreds2 = pv2.hundreds * 100;

    let current = num1;

    // Step 0: Starting Anchor
    steps.push({
      stepNumber: 1,
      title: `Start at ${num1}`,
      explanation: `Anchor at the minuend: ${num1}. In subtraction, we will leap backwards (to the left).`,
      actionLabel: `Start = ${num1}`,
      currentValue: current,
      highlightType: 'start',
    });

    if (hundreds2 > 0) {
      const next = current - hundreds2;
      steps.push({
        stepNumber: steps.length + 1,
        title: `Subtract Hundreds (-${hundreds2})`,
        explanation: `Jump backwards by ${hundreds2}: ${current} - ${hundreds2} = ${next}.`,
        actionLabel: `-${hundreds2}`,
        currentValue: next,
        highlightType: 'hundreds',
      });
      numberLineJumps.push({
        from: current,
        to: next,
        amount: hundreds2,
        direction: 'backward',
        label: `-${hundreds2}`,
        color: 'text-indigo-400',
      });
      current = next;
    }

    if (tens2 > 0) {
      const next = current - tens2;
      steps.push({
        stepNumber: steps.length + 1,
        title: `Subtract Tens (-${tens2})`,
        explanation: `Jump backwards by ${tens2}: ${current} - ${tens2} = ${next}.`,
        actionLabel: `-${tens2}`,
        currentValue: next,
        highlightType: 'tens',
      });
      numberLineJumps.push({
        from: current,
        to: next,
        amount: tens2,
        direction: 'backward',
        label: `-${tens2}`,
        color: 'text-emerald-400',
      });
      current = next;
    }

    if (ones2 > 0 || (tens2 === 0 && hundreds2 === 0)) {
      const next = Math.max(0, current - ones2);
      steps.push({
        stepNumber: steps.length + 1,
        title: `Subtract Remaining Ones (-${ones2})`,
        explanation: `Hop backwards by ${ones2} single units: ${current} - ${ones2} = ${next}.`,
        actionLabel: `-${ones2}`,
        currentValue: next,
        highlightType: 'ones',
      });
      numberLineJumps.push({
        from: current,
        to: next,
        amount: ones2,
        direction: 'backward',
        label: `-${ones2}`,
        color: 'text-rose-400',
      });
      current = next;
    }

    steps.push({
      stepNumber: steps.length + 1,
      title: `Final Destination: ${result}`,
      explanation: `You landed at the difference! Therefore, ${num1} - ${num2} = ${result}.`,
      actionLabel: `Result = ${result}`,
      currentValue: result,
      highlightType: 'finish',
    });
  } else {
    // Multiplication (Repeated Addition)
    let current = 0;
    steps.push({
      stepNumber: 1,
      title: `Start at 0`,
      explanation: `Multiplication is repeated equal groups. We will take ${num2} equal jumps of ${num1}.`,
      actionLabel: `Start = 0`,
      currentValue: 0,
      highlightType: 'start',
    });

    for (let g = 1; g <= Math.min(10, num2); g++) {
      const next = current + num1;
      steps.push({
        stepNumber: steps.length + 1,
        title: `Group ${g} of ${num1} (+${num1})`,
        explanation: `Add group #${g}: ${current} + ${num1} = ${next}.`,
        actionLabel: `+${num1} (Group ${g})`,
        currentValue: next,
        highlightType: 'tens',
      });
      numberLineJumps.push({
        from: current,
        to: next,
        amount: num1,
        direction: 'forward',
        label: `+${num1}`,
        color: 'text-emerald-400',
      });
      current = next;
    }

    steps.push({
      stepNumber: steps.length + 1,
      title: `Final Product: ${result}`,
      explanation: `${num1} multiplied by ${num2} equals ${result}.`,
      actionLabel: `Result = ${result}`,
      currentValue: result,
      highlightType: 'finish',
    });
  }

  // Regrouping (Carry / Borrow) checks
  const isAdditionCarry = operator === '+' && pv1.ones + pv2.ones >= 10;
  const isSubtractionBorrow = operator === '-' && pv1.ones < pv2.ones;

  // Number line coordinate range
  const allValues = [num1, result, ...numberLineJumps.map((j) => j.to), ...numberLineJumps.map((j) => j.from)];
  const minVal = Math.max(0, Math.floor(Math.min(...allValues) / 10) * 10 - (operator === '-' ? 5 : 0));
  const maxVal = Math.ceil(Math.max(...allValues) / 10) * 10 + 5;

  return {
    equation: `${num1} ${operator} ${num2}`,
    num1,
    operator,
    num2,
    result,
    steps,
    numberLine: {
      minVal,
      maxVal,
      jumps: numberLineJumps,
      startVal: operator === '*' ? 0 : num1,
      endVal: result,
    },
    placeValue: {
      pv1,
      pv2,
      pvResult,
      isAdditionCarry,
      isSubtractionBorrow,
    },
    counters: {
      count1: Math.min(30, num1),
      count2: Math.min(30, num2),
      total: Math.min(60, result),
    },
  };
}
