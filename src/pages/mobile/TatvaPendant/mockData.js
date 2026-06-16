export const SETTINGS_SECTIONS = {
  captureAi: [
    {
      id: 'auto-segment',
      icon: 'microphone',
      title: 'Auto-segment conversations',
      subtitle: 'Split the day into per-patient chunks',
      toggle: true,
      defaultOn: true,
    },
    {
      id: 'diarisation',
      icon: 'diarisation',
      title: 'Speaker diarisation',
      subtitle: 'Label doctor vs patient turns',
      toggle: true,
      defaultOn: true,
    },
    {
      id: 'languages',
      icon: 'languages',
      title: 'Languages',
      subtitle: 'Manage languages',
      showChevron: true,
    },
  ],
  notifications: [
    {
      id: 'review-reminders',
      icon: 'notification',
      title: 'Review reminders',
      subtitle: 'Notify when captures await assignment',
      toggle: true,
      defaultOn: true,
    },
  ],
  privacy: [
    {
      id: 'encryption',
      icon: 'encryption',
      title: 'Data & encryption',
      subtitle: 'Data handling and retention',
      showChevron: true,
    },
    {
      id: 'consent',
      icon: 'document',
      title: 'Consent & compliance',
      subtitle: 'Consent and compliance settings',
      showChevron: true,
    },
  ],
};
