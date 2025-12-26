# AttentionAssist — HCI Research Project (Group Project)

AttentionAssist was developed as a group project for CMPT 481 (Human-Computer Interaction) at the University of Saskatchewan.

This repository contains **my individual contributions** to the project, focusing on the implementation of the randomized notification system and the backend data collection pipeline used to record experiment results in CSV files for data analysis.

### Team Members
- Sayem Khondaker — Backend & Data Analysis
- Piper Abel — Frontend & UI Design (https://www.linkedin.com/in/piper-abel)
- Vinh Pham — Frontend & Backend (https://www.linkedin.com/in/vinhpham25)

Although the scripts included here primarily reflect my work, Vinh also contributed to both components, and Piper contributed to `random_notification.js`.

For access to the full project source code and instructions on how to run it, please feel free to contact me at ehtesam.alhaqq@gmail.com for a discussion. The link to a short demo video from the final report has been shared below. 

---

Below are some details about the project imported from the final report, which was also largely contributed by Piper Abel. If you would like to view the full report—which includes details about the experiment's evaluation approach, results, conclusions—please feel free to contact me.

## Interaction Problem
Users often face disruptions in productivity when receiving notifications that could cause them to lose focus. Current solutions to this problem include “Do Not Disturb” features, which silences all notifications, potentially causing the users to miss out on important information. Additionally, there are features that allow users to silence certain notifications, but still receive desired alerts. Our team aimed to find another solution that would help decrease distractions, while still ensuring users receive important alerts.

---

## Interaction Technique
AttentionAssist is an adaptive notification delivery system, which considers user activity to determine when the user is available to receive notifications. To take it a step further, we also designed simulated notifications that would alleviate the time it takes to identify and read the notifications.

### Activity Tracking: 
Our system tracks user activity to determine the user’s availability. We do this through evaluating a user's interactions including keyboard typing and mouse clicking. A user who is interacting with the task will be considered ‘busy,’ however, if a user stops interacting with the task for a given amount of time, they are deemed ‘available.’

### Notification Types: 
We elected to divide the notifications into three categories, primarily based on significance of content. 
  1) **Emergent**: These are critical alerts that concern the users’ safety and must be delivered immediately.
  2) **Important**: Some notifications may be time sensitive or contain vital information for the users, so these are deemed as important.
  3) **Non-Urgent**: Notifications which contain no significant content or value are put into a third category, which are not considered to be of high priority.

### Notification Delivery: 
The notifications in our system are delivered based on two main factors listed above, user availability, and priority of notification.
  - **When**: Both user activity and notification type is evaluated determining *when* to deliver a notification.
    - **Inactivity Threshold**: A set amount of time since the last activity, to determine when a user is inactive or available for a notification.
    - **Active (Busy User)**: When a user is not inside the inactivity threshold, they will still receive emergent and important notifications right away.
    - **Inactive (Available User)**: When a user hits the inactivity threshold, our system will then determine the user is available for notifications, then delivers the non-urgent notifications.
  - **How**: Our notifications are styled similarly, to maintain consistency, however there are slight differences based on the priority of the alert. The base design consists of a clear logo, title, timestamp, priority identifier icon, and        content, where they appear in the top-right corner for a given duration.
    - **Emergent**: These are coloured in red, and have an alarming text tone,  to give the user a sense of urgency and to ensure they will read the notification.
    - **Important**: The style remains unchanged from the base design.
    - **Non-Urgent**: These will accumulate in a list until the user is available, and is then shown at once to the user. They appear in a smooth animation, in a vertical list where users should be able to easily and quickly scan the notifications, before they automatically disappear.   

---

## Demo Video
[![Demo Video](https://img.youtube.com/vi/_HdQg56JTIQ/0.jpg)](https://youtu.be/_HdQg56JTIQ)


---

## System Architecture
The system’s frontend was built using HTML, CSS, and JavaScript, enhanced by libraries like QuillJS for text editing and GSAP for animations. On the backend, we used a Node.js server with Express to handle `POST` requests from each group, storing the data into separate CSV files using Node’s `fs` module. We also used `body-parser` and `path` to support request parsing and file operations.


