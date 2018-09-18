// endpoints

export const endpoints = {
  startTestEvent: '/api/start-test-event/',
  analysisEvent: '/api/analysis-event',
  cardTimerEvent: '/api/card-timer-event',
  dragEvent: '/api/drag-event',
  firstTypingEvent: '/api/first-typing-event',
  keywordEvent: '/api/keyword-event',
  revisionEvent: '/api/revision-event',
  sectionDataEvent: '/api/section-data-event',
  sectionWordsEvent: '/api/section-words-event',
  timeSpentEvent: '/api/time-spent-event',
  transitionEvent: '/api/transition-event',
};

export const getHeader = () => {
  const header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  return header;
}