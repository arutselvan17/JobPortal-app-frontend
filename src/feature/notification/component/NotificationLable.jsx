export const getNotificationLabel = (type) => {
  switch (type) {
    case "JOB_APPLIED":
      return "New Job Application";

    case "APPLICATION_UPDATED":
      return "Application Status Updated";

    case "NEW_JOB_POSTED":
      return "New Job Posted";

    case "DEADLINE_EXTENDED":
      return "Deadline Extended";

    case "USER_ADDED":
      return "New User Registered";

    case "EMPLOYER_VERIFICATION_REQUEST":
      return "Employer Verification Request";

    case "PLATFORM_ANNOUNCEMENT":
      return "Platform Announcement";

    default:
      return "Notification";
  }
};