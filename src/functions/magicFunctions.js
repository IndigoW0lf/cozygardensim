export const ambientMagicAssessment = (
  currentMoonPhase,
  gardenLocation,
  recentSupernaturalEvents
) => {
  let magicLevel = 'low';
  let recommendations = [];

  if (currentMoonPhase === 'full moon' || currentMoonPhase === 'new moon') {
    magicLevel = 'high';
    recommendations.push('Conduct magic-enhancing rituals.');
  }

  if (gardenLocation === 'forest edge') {
    recommendations.push('Use protective wards.');
  } else if (gardenLocation === 'mountain peak') {
    magicLevel = 'moderate';
    recommendations.push('Harness wind magic.');
  }

  if (recentSupernaturalEvents) {
    magicLevel = 'unstable';
    recommendations.push('Increase magical surveillance.');
  }

  let report = `Ambient magic level is ${magicLevel}. `;
  if (recommendations.length) {
    report += 'Recommendations: ' + recommendations.join('; ') + '.';
  } else {
    report += 'No specific actions needed.';
  }

  return report;
};