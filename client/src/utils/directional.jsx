import React from 'react';

/**
 * Directional Letter Disambiguation Engine
 * Wraps b, d, p, q in visual micro-anchors when directional mode is enabled.
 */
export function formatDirectionalText(text, isEnabled = true) {
  if (!text) return null;
  if (!isEnabled) return text;

  // Split text into words while keeping spaces
  const words = text.split(/(\s+)/);

  return words.map((word, wordIdx) => {
    // Retain whitespace as-is
    if (/^\s+$/.test(word)) {
      return word;
    }

    // Process individual characters inside words
    const cleanWordLower = word.toLowerCase().replace(/[^\w]/g, '');

    // Check for Left (Blue) / Right (Red) directional keywords
    let directionClass = '';
    if (['left', 'west', 'counterclockwise'].includes(cleanWordLower)) {
      directionClass = 'direction-left';
    } else if (['right', 'east', 'clockwise'].includes(cleanWordLower)) {
      directionClass = 'direction-right';
    }

    const chars = Array.from(word);
    const formattedChars = chars.map((char, charIdx) => {
      const lower = char.toLowerCase();
      if (['b', 'd', 'p', 'q'].includes(lower)) {
        return (
          <span
            key={`${wordIdx}-${charIdx}`}
            className={`anchor-container anchor-${lower}`}
            title={`Directional Anchor: ${char}`}
          >
            {char}
          </span>
        );
      }
      return char;
    });

    return (
      <span key={wordIdx} className={`inline-block ${directionClass}`}>
        {formattedChars}
      </span>
    );
  });
}

/**
 * Render Left Margin Landing Anchor ("Go" dot) and Ordinal Sequence Badges
 */
export function renderSequencePrefix(sentenceIdx, isEnabled = true) {
  if (!isEnabled) return null;

  return (
    <span className="inline-flex items-center select-none mr-2">
      {/* Left-Margin "Go" Landing Dot */}
      <span
        className="margin-start-anchor"
        title="Left Margin Line Landing Target"
      >
        ➔
      </span>
      {/* Ordinal Sentence Badge */}
      <span className="sequence-badge" title={`Sentence #${sentenceIdx + 1}`}>
        [{sentenceIdx + 1}]
      </span>
    </span>
  );
}

/**
 * Render Right-Pointing Inter-Word Scan Arrow
 */
export function renderScanArrow(isEnabled = true) {
  if (!isEnabled) return null;
  return <span className="scan-arrow">➔</span>;
}
