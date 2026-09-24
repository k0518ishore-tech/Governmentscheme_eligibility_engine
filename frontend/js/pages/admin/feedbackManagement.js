// SchemeGuide — Feedback Management

function renderFeedbackManagement(container) {
  container.innerHTML = appLayout('feedback-management', `
    <div class="page-header">
      <h1 class="page-title">Feedback Management</h1>
      <p class="page-subtitle">Review citizen feedback and scheme ratings.</p>
    </div>
    <div class="empty-state">
      <div class="empty-state-title">No feedback records</div>
      <p class="empty-state-msg">Feedback collection is not enabled yet. Ratings and comments will appear here after feedback is persisted.</p>
    </div>
  `, true);
}
