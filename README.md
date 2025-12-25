# AttentionAssist — HCI Research Project (Group Project)

AttentionAssist was developed as a group project for CMPT 481 (Human-Computer Interaction) at the University of Saskatchewan.

This repository contains **my individual contributions** to the project, focusing on the implementation of the randomized notification system and the backend data collection pipeline used to record experiment results in a CSV file for data analysis.

### Team Members
- Sayem Khondaker — Backend & Data Analysis
- Piper Abel — Frontend & UI Design (https://www.linkedin.com/in/piper-abel)
- Vinh Pham — Frontend & Backend (https://www.linkedin.com/in/vinhpham25)

Although both the scripts above are mainly my work, Vinh also had contributions in both scripts and Piper in `random_notification.js`.

For access to the full project source code including how to run it or a live demonstration, please feel free to contact me (ehtesam.alhaqq@gmail.com) for a discussion.

---

Below are some details about the project imported from the final report, which was also largely contributed by Piper Abel. If you would like to view to the full report—which includes details about the experiment's evaluation approach, results, conclusions, please feel free to contact me.

## Interaction Problem
Users often face disruptions in productivity when receiving notifications that could cause them to lose focus. Current solutions to this problem include “Do Not Disturb” features, which silences all notifications, potentially causing the users to miss out on important information. Additionally, there are features that allow users to silence certain notifications, but still receive desired alerts. Our team aimed to find another solution that would help decrease distractions, while still ensuring users receive important alerts.

## Interaction Technique
AttentionAssist is an adaptive notification delivery system, which considers user activity to determine when the user is available to receive notifications. To take it a step further, we also designed simulated notifications that would alleviate the time it takes to identify and read the notifications.

### Activity Tracking: Our system tracks user activity to determine the user’s availability. We do this through evaluating a user's interactions including keyboard typing and mouse clicking. A user who is interacting with the task will be considered ‘busy,’ however, if a user stops interacting with the task for a given amount of time, they are deemed ‘available.’

### Notification Types: We elected to divide the notifications into three categories, primarily based on significance of content. 
1) **Emergent**: These are critical alerts that concern the users’ safety and must be delivered immediately.
2) **Important**: Some notifications may be time sensitive or contain vital information for the users, so these are deemed as important.
3) **Non-Urgent**: Notifications which contain no significant content or value are put into a third category, which are not considered to be of high priority.


