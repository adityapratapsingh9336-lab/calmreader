/**
 * Stroke Accuracy & Geometric Path Corridor Evaluator
 * Samples exact SVG reference path coordinates and computes bidirectional Chamfer corridor accuracy,
 * out-of-bounds stray penalties, and stroke completeness.
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
 */
export function evaluateDrawnStrokes(drawnPoints, template, corridorRadius = 26) {
  if (!drawnPoints || drawnPoints.length < 15) {
    return {
      accuracy: 0,
      coveragePercent: 0,
      inCorridorPercent: 0,
      isMastered: false,
      strayPointsCount: 0,
      feedback: '⚠️ Not enough strokes detected. Trace along the full dotted guide to evaluate!',
    };
  }

  const refPoints = sampleTemplatePathPoints(template, 40);
  if (refPoints.length === 0) {
    return {
      accuracy: 85,
      coveragePercent: 85,
      inCorridorPercent: 85,
      isMastered: true,
      strayPointsCount: 0,
      feedback: 'Freehand drawing recorded!',
    };
  }

  // 1. FORWARD CHECK: What % of reference path points were touched by user within corridorRadius?
  let coveredRefPointsCount = 0;
  refPoints.forEach((refPt) => {
    const isCovered = drawnPoints.some((uPt) => {
      const dist = Math.hypot(uPt.x - refPt.x, uPt.y - refPt.y);
      return dist <= corridorRadius;
    });
    if (isCovered) coveredRefPointsCount++;
  });

  const coveragePercent = Math.round((coveredRefPointsCount / refPoints.length) * 100);

  // 2. REVERSE CHECK: What % of user drawn points stayed INSIDE the allowable corridor?
  // Out-of-bounds penalty (e.g. curving left instead of right)
  let inCorridorUserPointsCount = 0;
  let strayPointsCount = 0;

  drawnPoints.forEach((uPt) => {
    let minDist = Infinity;
    for (let i = 0; i < refPoints.length; i++) {
      const dist = Math.hypot(uPt.x - refPoints[i].x, uPt.y - refPoints[i].y);
      if (dist < minDist) minDist = dist;
      if (dist <= corridorRadius) break;
    }

    if (minDist <= corridorRadius + 6) {
      inCorridorUserPointsCount++;
    } else {
      strayPointsCount++;
    }
  });

  const inCorridorPercent = Math.round((inCorridorUserPointsCount / drawnPoints.length) * 100);

  // 3. COMBINED ACCURACY CALCULATION
  // High accuracy requires BOTH high coverage of the letter AND low stray out-of-bounds strokes!
  let rawAccuracy = Math.round(coveragePercent * 0.55 + inCorridorPercent * 0.45);

  // Penalize heavily if user drew in the wrong direction or had massive out-of-bounds strokes
  if (inCorridorPercent < 55) {
    rawAccuracy = Math.min(rawAccuracy, inCorridorPercent);
  }
  if (coveragePercent < 60) {
    rawAccuracy = Math.min(rawAccuracy, coveragePercent);
  }

  const finalAccuracy = Math.max(0, Math.min(100, rawAccuracy));
  const isMastered = finalAccuracy >= 78 && coveragePercent >= 75 && inCorridorPercent >= 70;

  // 4. DIAGNOSTIC EDUCATIONAL FEEDBACK
  let feedback = '';
  if (isMastered) {
    feedback = '🌟 Outstanding accuracy! Your strokes stayed strictly inside the guide corridor and covered the full letter!';
  } else if (inCorridorPercent < 60) {
    feedback = `⚠️ Out of bounds! You strayed outside the guide (${100 - inCorridorPercent}% off-path). ${template.guideHint || 'Follow the dotted line direction carefully.'}`;
  } else if (coveragePercent < 70) {
    feedback = `⚠️ Incomplete trace (${coveragePercent}% covered). Make sure to trace all parts from start point ① to the end!`;
  } else {
    feedback = '👍 Good attempt! Try slowing down to keep your pen centered directly on the dotted midline.';
  }

  return {
    accuracy: finalAccuracy,
    coveragePercent,
    inCorridorPercent,
    strayPointsCount,
    isMastered,
    feedback,
  };
}
