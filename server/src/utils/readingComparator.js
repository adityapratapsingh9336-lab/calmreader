/**
 * Server-Side Reading Comparator & Phonics Diagnostics Engine
 */

export function cleanWord(w) {
  if (!w) return '';
  return w.toLowerCase().replace(/^[^\w]+|[^\w]+$/g, '').trim();
}

export function wordLevenshtein(a, b) {
  const s1 = cleanWord(a);
  const s2 = cleanWord(b);
  if (s1 === s2) return 0;
  if (!s1.length) return s2.length;
  if (!s2.length) return s1.length;

  const matrix = Array.from({ length: s1.length + 1 }, () =>
    new Array(s2.length + 1).fill(0)
  );

  for (let i = 0; i <= s1.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= s2.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[s1.length][s2.length];
}

export function alignReading(originalText, spokenText) {
  const origTokens = (originalText || '').trim().split(/\s+/).filter(Boolean);
  const spokenTokens = (spokenText || '').trim().split(/\s+/).filter(Boolean);

  const m = origTokens.length;
  const n = spokenTokens.length;

  if (m === 0 && n === 0) {
    return {
      tokens: [],
      accuracy: 100,
      mistakes: [],
      stats: { total: 0, correct: 0, substituted: 0, omitted: 0, inserted: 0 },
      phonicsInsights: [],
    };
  }

  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i * 2;
  for (let j = 0; j <= n; j++) dp[0][j] = j * 2;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const oClean = cleanWord(origTokens[i - 1]);
      const sClean = cleanWord(spokenTokens[j - 1]);

      let matchCost;
      if (oClean === sClean) {
        matchCost = 0;
      } else {
        const dist = wordLevenshtein(oClean, sClean);
        const maxLen = Math.max(oClean.length, sClean.length, 1);
        matchCost = dist <= 2 ? 1 + dist / maxLen : 3;
      }

      dp[i][j] = Math.min(
        dp[i - 1][j - 1] + matchCost,
        dp[i - 1][j] + 2,
        dp[i][j - 1] + 2
      );
    }
  }

  let i = m;
  let j = n;
  const alignment = [];

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0) {
      const oClean = cleanWord(origTokens[i - 1]);
      const sClean = cleanWord(spokenTokens[j - 1]);
      const isExact = oClean === sClean;
      const dist = wordLevenshtein(oClean, sClean);
      const maxLen = Math.max(oClean.length, sClean.length, 1);
      const matchCost = isExact ? 0 : dist <= 2 ? 1 + dist / maxLen : 3;

      if (Math.abs(dp[i][j] - (dp[i - 1][j - 1] + matchCost)) < 0.001) {
        if (isExact) {
          alignment.unshift({
            type: 'MATCH',
            original: origTokens[i - 1],
            spoken: spokenTokens[j - 1],
          });
        } else {
          alignment.unshift({
            type: 'SUBSTITUTION',
            original: origTokens[i - 1],
            spoken: spokenTokens[j - 1],
          });
        }
        i--;
        j--;
        continue;
      }
    }

    if (i > 0 && Math.abs(dp[i][j] - (dp[i - 1][j] + 2)) < 0.001) {
      alignment.unshift({
        type: 'OMISSION',
        original: origTokens[i - 1],
        spoken: null,
      });
      i--;
    } else if (j > 0) {
      alignment.unshift({
        type: 'INSERTION',
        original: null,
        spoken: spokenTokens[j - 1],
      });
      j--;
    } else {
      break;
    }
  }

  let correctCount = 0;
  let substitutedCount = 0;
  let omittedCount = 0;
  let insertedCount = 0;
  const mistakes = [];

  alignment.forEach((item, idx) => {
    if (item.type === 'MATCH') {
      correctCount++;
    } else if (item.type === 'SUBSTITUTION') {
      substitutedCount++;
      mistakes.push({
        id: idx + 1,
        type: 'SUBSTITUTION',
        label: 'Wrong Word',
        original: item.original,
        spoken: item.spoken,
        message: `Read "${item.spoken}" instead of "${item.original}"`,
      });
    } else if (item.type === 'OMISSION') {
      omittedCount++;
      mistakes.push({
        id: idx + 1,
        type: 'OMISSION',
        label: 'Skipped Word',
        original: item.original,
        spoken: null,
        message: `Skipped word "${item.original}"`,
      });
    } else if (item.type === 'INSERTION') {
      insertedCount++;
      mistakes.push({
        id: idx + 1,
        type: 'INSERTION',
        label: 'Extra Word',
        original: null,
        spoken: item.spoken,
        message: `Added extra word "${item.spoken}"`,
      });
    }
  });

  const totalOrigWords = origTokens.length || 1;
  const accuracy = Math.max(
    0,
    Math.min(100, Math.round((correctCount / totalOrigWords) * 100))
  );

  const phonicsInsights = analyzeDyslexicPatterns(alignment);

  return {
    tokens: alignment,
    accuracy,
    mistakes,
    stats: {
      total: origTokens.length,
      correct: correctCount,
      substituted: substitutedCount,
      omitted: omittedCount,
      inserted: insertedCount,
    },
    phonicsInsights,
  };
}

export function analyzeDyslexicPatterns(alignment) {
  const insights = [];

  alignment.forEach((item) => {
    if (item.type === 'SUBSTITUTION' && item.original && item.spoken) {
      const orig = cleanWord(item.original);
      const spk = cleanWord(item.spoken);

      const mirrorPairs = [
        ['b', 'd'],
        ['p', 'q'],
        ['m', 'w'],
        ['n', 'u'],
      ];
      for (const [char1, char2] of mirrorPairs) {
        if (
          (orig.includes(char1) && spk.includes(char2)) ||
          (orig.includes(char2) && spk.includes(char1))
        ) {
          insights.push({
            type: 'MIRROR_LETTER',
            title: `Mirror Letter Reversal (${char1} ↔ ${char2})`,
            detail: `You said "${item.spoken}" for "${item.original}". Notice the direction of the letter stem (${char1} vs ${char2}).`,
            anchorHint: `Focus on visual directional anchors when reading '${char1}' and '${char2}'.`,
          });
          break;
        }
      }

      const vowels = ['a', 'e', 'i', 'o', 'u'];
      if (orig.length === spk.length && orig.length >= 3) {
        for (let idx = 0; idx < orig.length; idx++) {
          if (
            orig[idx] !== spk[idx] &&
            vowels.includes(orig[idx]) &&
            vowels.includes(spk[idx])
          ) {
            insights.push({
              type: 'VOWEL_CONFUSION',
              title: `Vowel Sound Confusion ('${orig[idx]}' vs '${spk[idx]}')`,
              detail: `You confused the short '${orig[idx]}' sound in "${item.original}" with '${spk[idx]}' in "${item.spoken}".`,
              anchorHint: `Practice opening your mouth shape clearly for '${orig[idx]}'.`,
            });
            break;
          }
        }
      }
    } else if (item.type === 'OMISSION' && item.original) {
      const orig = cleanWord(item.original);
      const sightWords = ['the', 'a', 'an', 'and', 'in', 'on', 'at', 'to', 'for', 'of', 'is', 'it'];
      if (sightWords.includes(orig)) {
        insights.push({
          type: 'SIGHT_WORD_OMISSION',
          title: `Skipped Sight Word ("${item.original}")`,
          detail: `Short connector words like "${item.original}" are commonly skipped during visual crowding.`,
          anchorHint: `Use the Focus Spotlight or Left Margin Landing cues to track line flow.`,
        });
      }
    }
  });

  const seen = new Set();
  return insights.filter((ins) => {
    if (seen.has(ins.title)) return false;
    seen.add(ins.title);
    return true;
  });
}
