export function calculateTrust(data) {
  let score = 100;

  if (data.stdDeviation < 10)
    score -= 25;

  if (data.maxCPS > 12)
    score -= 20;

  if (data.repeatPercentage > 40)
    score -= 25;

  if (data.positionSpread < 8)
    score -= 15;

  if (data.sessionMinutes > 30)
    score -= 15;

  return Math.max(score, 0);
}