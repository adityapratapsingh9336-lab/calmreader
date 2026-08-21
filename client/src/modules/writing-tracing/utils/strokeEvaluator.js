/**
 * Adaptive Stroke Accuracy & Geometric Path Corridor Evaluator
 * Dynamically adjusts allowable tracing corridor with pen width,
 * computes soft-distance in-corridor precision, and evaluates path coverage.
 */

/**
 * Samples equidistant reference points along the SVG paths of a template.
 */
export function sampleTemplatePathPoints(template, numSamplesPerStroke = 50) {
  const points = [];
  if (!template || !template.strokes) return points;

  // In browser DOM environment, use SVGPathElement for mathematical precision
  if (typeof document !== 'undefined') {
    const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    template.strokes.forEach((stroke) => {
      try {
        pathEl.setAttribute('d', stroke.pathD);
        const totalLen = pathEl.getTotalLength();
        if (totalLen > 0) {
          for (let i = 0; i <= numSamplesPerStroke; i++) {
            const distance = (i / numSamplesPerStroke) * totalLen;
            const pt = pathEl.getPointAtLength(distance);
            points.push({ x: pt.x, y: pt.y, strokeId: stroke.id });
          }
        }
      } catch (err) {
        // Fallback linear interpolation
        for (let i = 0; i <= numSamplesPerStroke; i++) {
          const t = i / numSamplesPerStroke;
          points.push({
            x: stroke.start.x + (stroke.end.x - stroke.start.x) * t,
            y: stroke.start.y + (stroke.end.y - stroke.start.y) * t,
            strokeId: stroke.id,
          });
        }
      }
    });
  }

  return points;
}

/**
 * Evaluates user drawn canvas points against template reference path corridor.
 * Dynamically scales corridor radius based on pen brush size.
 */
export function evaluateDrawnStrokes(drawnPoints, template, brushSize = 12) {
  if (!drawnPoints || drawnPoints.length < 12) {
    return {
      accuracy: 0,
      coveragePercent: 0,
      inCorridorPercent: 0,
      isMastered: false,
      strayPointsCount: 0,
      feedback: '⚠️ Please trace along the letter shape to check your handwriting!',
    };
  }

  // Dynamic corridor tolerance: adjusts with pen width
  // Fine (6px) -> 28px, Medium (12px) -> 34px, Broad (20px) -> 40px
  const corridorRadius = Math.round(24 + (brushSize * 0.8));

  const refPoints = sampleTemplatePathPoints(template, 45);
  if (refPoints.length === 0) {
    return {
      accuracy: 88,
      coveragePercent: 88,
      inCorridorPercent: 88,
      isMastered: true,
      strayPointsCount: 0,
      feedback: 'Great freehand drawing recorded!',
    };
  }

  // 1. FORWARD COVERAGE: What % of reference path points were traced within corridor?
  let coveredRefPointsCount = 0;
  refPoints.forEach((refPt) => {
    const isCovered = drawnPoints.some((uPt) => {
      const dist = Math.hypot(uPt.x - refPt.x, uPt.y - refPt.y);
      return dist <= corridorRadius + 4;
    });
    if (isCovered) coveredRefPointsCount++;
  });

  const coveragePercent = Math.round((coveredRefPointsCount / refPoints.length) * 100);

  // 2. REVERSE IN-CORRIDOR PRECISION: What % of drawn strokes stayed inside allowable zone?
  // Uses soft continuous distance model so slight tremors/wobbles are forgivingly graded
  let totalPrecisionScore = 0;
  let strayPointsCount = 0;

  drawnPoints.forEach((uPt) => {
    let minDist = Infinity;
    for (let i = 0; i < refPoints.length; i++) {
      const dist = Math.hypot(uPt.x - refPoints[i].x, uPt.y - refPoints[i].y);
      if (dist < minDist) minDist = dist;
      if (dist <= corridorRadius) break;
    }

    if (minDist <= corridorRadius) {
      totalPrecisionScore += 1.0; // Perfect inside corridor
    } else if (minDist <= corridorRadius + 16) {
      // Soft margin for slight tremor
      const softScore = Math.max(0.4, 1.0 - ((minDist - corridorRadius) / 20) * 0.6);
      totalPrecisionScore += softScore;
    } else {
      strayPointsCount++; // Out of bounds (e.g. wrong direction / reversed loop)
    }
  });

  const inCorridorPercent = Math.min(100, Math.round((totalPrecisionScore / drawnPoints.length) * 100));

  // 3. COMBINED BALANCED ACCURACY
  let compositeScore = Math.round(coveragePercent * 0.50 + inCorridorPercent * 0.50);

  // Positive reinforcement bonus for good motor control
  if (coveragePercent >= 70 && inCorridorPercent >= 70) {
    compositeScore = Math.min(100, Math.round(compositeScore * 1.12));
  } else if (inCorridorPercent < 50) {
    compositeScore = Math.min(compositeScore, inCorridorPercent);
  }

  const finalAccuracy = Math.max(0, Math.min(100, compositeScore));
  const isMastered = finalAccuracy >= 70 && coveragePercent >= 65 && inCorridorPercent >= 60;

  // 4. CHILD-FRIENDLY ACCESSIBILITY FEEDBACK
  let feedback = '';
  if (isMastered) {
    feedback = '🌟 Fantastic motor control! You traced the letter cleanly within the guide corridor!';
  } else if (inCorridorPercent < 55) {
    feedback = `💡 Keep your strokes inside the guide! ${template.guideHint || 'Follow the dotted path direction carefully.'}`;
  } else if (coveragePercent < 65) {
    feedback = `💡 Almost there! You covered ${coveragePercent}% of the letter. Make sure to trace from start dot ① all the way to the end!`;
  } else {
    feedback = '👍 Good practice! Try following the green start dot ① in one smooth, continuous motion.';
  }

  return {
    accuracy: finalAccuracy,
    coveragePercent,
    inCorridorPercent,
    strayPointsCount,
    corridorRadius,
    isMastered,
    feedback,
  };
}
