export function generateSessionId(): string {
  return `session-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)}`;
}

export function getSessionId(): string {
  if (typeof window === 'undefined') {
    return generateSessionId();
  }

  let sessionId = localStorage.getItem('dealAnalyzerSessionId');

  if (!sessionId) {
    sessionId = generateSessionId();

    localStorage.setItem(
      'dealAnalyzerSessionId',
      sessionId
    );
  }

  return sessionId;
}

export function clearSessionId(): void {
  localStorage.removeItem('dealAnalyzerSessionId');
}