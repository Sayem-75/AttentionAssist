    /** Random Notification System Implementation **/

    document.addEventListener("DOMContentLoaded", function () {
        const notificationContainer = document.getElementById("notification-one");
        const notificationPanel = document.getElementById("notification-panel");

        // Sound for notifications
        const alertSound = document.getElementById("alert-sound");
        const importantSound = document.getElementById("important-sound");
        const nonUrgentSound = document.getElementById("nonurgent-sound");

        // Adjustable send rate of notifications in milliseconds (e.g., 1000ms = 1 seconds)
        const sendRate = 15000;

        // Define notification types object and how many should be sent
        const notificationTypes = {
            // Adjust these values as needed
            emergent: 1,
            important: 4,
            nonUrgent: 5
        };

        const storedNotifications = [];


        // Maximum number of notifications displayed at a time
        const maxNotifications = 10;

        // Notification Titles and Contents
        const notificationData = {
            emergent: [
                { title: "Emergency Alert", content: "🚔 RCMP has issued an alert. Stay indoors!"},
                { title: "Amber Alert", content: "Please look out for a suspent last seen on January 11, at 5pm in London. Please contact the RCMP if you or anyone you know has any information"},
                { title: "Emergency Alert", content: "Tornado warning. Please take shelter immediately"}
            ],
            important: [
                { title: "Mom", content: "What do you want for dinner?" },
                { title: "Doctor's Office", content: "Reply YES to confirm your appointment."},
                { title: "Professor Smith", content: "Class has been cancelled today."},
                { title: "Jesse Brown", content: "I have a meeting and can't make it tonight. Sorry!"},
                { title: "Carl Jr.", content: "My psychology presentation is at 3pm today. Hope you can make it."},
                { title: "Dentist On 5th Ave", content: "Hi there, our records say you are due for your annual check up."}

            ],
            nonUrgent: [
                { title: "Candy Crush", content: "50% off candy until April 25th."},
                { title: "Snapchat", content: "Sam uploaded a new story!" },
                { title: "Snapchat", content: "Jerry send you a chat."},
                { title: "Firework Shop", content: "50% off candy until April 25th."},
                { title: "Snapchat", content: "Carson is typing..."},
                { title: "Snapchat", content: "Crazylizard42 added you."},
                { title: "Pokemon Shop", content: "50% off pokemon cards until April 12th."},
                { title: "Peekashu", content: "99% off Peekashu Special until May 10th."},
                { title: "Hello Coffee", content: "0.1% off Coffee until May 2nd."},
                { title: "Birdaycake Bakery", content: "20% off for returning customer until June 20th."} 
            ]
        };

        // Initialize all click counters in localStorage if not set
        if (!localStorage.getItem("clickCounter")) {
            localStorage.setItem("clickCounter", "0");
        }

        if (!localStorage.getItem("emergentClicks")) {
            localStorage.setItem("emergentClicks", "0");
        }

        if (!localStorage.getItem("importantClicks")) {
            localStorage.setItem("importantClicks", "0");
        }

        if (!localStorage.getItem("nonUrgentClicks")) {
            localStorage.setItem("nonUrgentClicks", "0");
        }

        // Track user inactivity after receiving a notification
        let inactivityTimerAfterN = null;
        let inactiveStartTimeAfterN = null;
        let inactiveAfterNotification = [];
        localStorage.setItem("inactiveAfterNotification", JSON.stringify(inactiveAfterNotification));

        // Function to get the notification types randomly while considering limits
        function getRandomNotificationType() {
            // Filter the all types of notifications
            const types = Object.keys(notificationTypes).filter(type => notificationTypes[type] > 0);

            // If all limits are reached, stop sending notifications
            if (types.length === 0)
                return null;

            // Get a random type of notification from the filtered list to send
            let randomType = types[Math.floor(Math.random() * types.length)];
            notificationTypes[randomType]--; // Reduce count after sending
            return randomType;
        }

        function storeAndRenderToPanel(type, notification) {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          
            // Attach time and type for use later
            notification.time = timeString;
            notification.type = type;
          
            storedNotifications.push(notification);
            renderNotificationsToPanel();
        }
          
        
        function renderNotificationsToPanel() {
            notificationPanel.innerHTML = '<button id="close-panel">×</button>';
          
            const clearBtn = document.createElement("button");
            clearBtn.textContent = "CLEAR ALL";
            clearBtn.classList.add("clear-btn");
            clearBtn.style.float = "right";
            clearBtn.onclick = () => {
              storedNotifications.length = 0;
              renderNotificationsToPanel();
            };
            notificationPanel.appendChild(clearBtn);
          
            storedNotifications.forEach(n => {
              const notification = document.createElement("div");
              
              const cssClass = n.type === "emergent" ? "emergent1" :
                               n.type === "important" ? "important1" : "nonUrgent1";
          
              notification.classList.add("panel-notification", cssClass);
          
              const title = document.createElement("h3");
              title.innerText = n.title;
          
              const time = document.createElement("h5");
              time.innerText = n.time;
          
              const content = document.createElement("p");
              content.innerText = n.content;
          
              notification.appendChild(title);
              notification.appendChild(time);
              notification.appendChild(content);
          
              notificationPanel.appendChild(notification);
            });
          
            const closeBtn = document.getElementById("close-panel");
            if (closeBtn) {
              closeBtn.addEventListener("click", () => {
                notificationPanel.classList.remove("active");
              });
            }
        }
          

        // Create notifications to be added to the "notification-one" container
        function createNotification(type) {
            if (!type || !notificationData[type]) return; // Error handling: prevent errors if no valid notification type or data exists

            // Randomly select a notification from notificationData
            const randomIndex = Math.floor(Math.random() * notificationData[type].length);
            const selectedNotification = notificationData[type][randomIndex];

            // Adjust display duration as needed
            // let displayDuration = 3000;

            // Different display duration for different notification type
            let displayDuration = type === "emergent" ? 8000 
                                : type === "important" ? 5000
                                : 3000; // Default for nonUrgent type

            // Create a new notifcation in a div container
            const notification = document.createElement("div");
            notification.classList.add("notification", type);

            // Create a title and paragraph (text content) for each notification
            const notificationTitle = document.createElement("h3");
            const notificationContent = document.createElement("p");
            notificationTitle.classList.add("notification-title", type);
            notificationContent.classList.add("notification-content", type);

            // Change the title and text content depending on the type variable
            notificationTitle.innerText = selectedNotification.title; 
            notificationContent.innerText = selectedNotification.content; 

            // Append the title and text content to the notifcation
            notification.appendChild(notificationTitle);
            notification.appendChild(notificationContent);

            // Append the notification to the container
            notificationContainer.appendChild(notification);

            // GSAP Animation: Slide down on appearance
            gsap.from(notification, { y: -50, opacity: 0, duration: 0.5 });

            //  Store inside th Panel;
            storeAndRenderToPanel(type, selectedNotification);

            // console.log(`Sent a "${type}" notification: ${selectedNotification.title}`);

            // Start tracking inactivity after notification
            // if (inactiveStartTimeAfterN === null) {
            //     inactiveStartTimeAfterN = Date.now();
            //     console.log(`Start time = ${inactiveStartTimeAfterN}`);
            //     console.log("Started tracking inactivity after notification...");
            // }

            setTimeout(() => {
                if (inactiveStartTimeAfterN === null) {
                    inactiveStartTimeAfterN = Date.now();
                    // console.log(`Start time = ${inactiveStartTimeAfterN}`);
                    console.log("Started tracking inactivity after notification...");
                }
            }, 1000);

            // Add event listener to track clicks on notifications
            notification.addEventListener("click", function () {
                let clickCounter = parseInt(localStorage.getItem("clickCounter"), 10) || 0;         // Total notification clicks
                let typeClickCounter = parseInt(localStorage.getItem(`${type}Clicks`), 10) || 0;    // Each type of notification click    

                // Increment the click counters
                clickCounter++;
                typeClickCounter++

                localStorage.setItem("clickCounter", clickCounter);
                localStorage.setItem(`${type}Clicks`, typeClickCounter);

                // console.log(`Notification clicked! Total: ${clickCounter}, ${type} Clicks: ${typeClickCounter}`);

            });

            // Play sound for emergent notifications
            if (type === "emergent" && alertSound) {
                alertSound.volume = 0.15;
                alertSound.play().catch(error => console.log("Sound could not be played: ", error));
            } else if (type === "important" && importantSound) {
                importantSound.volume = 0.15;
                importantSound.play().catch(error => console.log("Sound could not be played: ", error));
            } else {
                nonUrgentSound.volume = 0.15;
                nonUrgentSound.play().catch(error => console.log("Sound could not be played: ", error));
            }

            // If max notifications limit is reached, remove the oldest notification (with temporary animation)
            if (notificationContainer.children.length > maxNotifications) {
                let oldestNotification = notificationContainer.firstChild;
                if (oldestNotification) {
                    gsap.to(oldestNotification, { y: -50, opacity: 0, duration: 0.5, onComplete: () => oldestNotification.remove() });
                }
            }

            // Show the notification and remove after some time (with temporary animation)
            setTimeout(() => {
                gsap.to(notification, { y: -50, opacity: 0, duration: 0.5, onComplete: () => notification.remove() });
                // console.log(`"${type}" notification disappeared.`);
            }, displayDuration);
        }

        function resetActivityAfterN () {
            // Clear the previous timer if user moves, clicks, or types
            clearTimeout(inactivityTimerAfterN);

            // If the user was inactive, calculate inactivity duration before resetting
            if (inactiveStartTimeAfterN !== null) {
                let inactiveEndTimeAfterN = Date.now();
                let inactivityDurationAfterN = (Math.floor((inactiveEndTimeAfterN - inactiveStartTimeAfterN) / 1000)); // Convert to seconds

                // Store in array and localStorage
                inactiveAfterNotification.push(inactivityDurationAfterN);
                localStorage.setItem("inactiveAfterNotification", JSON.stringify(inactiveAfterNotification));
                console.log(`User was inactive for ${inactivityDurationAfterN} seconds after receiving a notification`);

                // Reset after tracking
                inactiveStartTimeAfterN = null;
            }
        }

        document.addEventListener("mousedown", resetActivityAfterN);
        // document.addEventListener("mousemove", resetActivityAfterN);
        document.addEventListener("keydown", resetActivityAfterN);

        // Start sending notification at defined intervals
        const intervalId = setInterval(() => {
            const type = getRandomNotificationType();
            createNotification(type);

            // Check if all notifications have been sent
            if (Object.values(notificationTypes).every(count => count === 0)) {
                console.log("All notifications have been sent! Stopping system.");
                clearInterval(intervalId); // Stop sending any further notifications
            }
        }, sendRate);
    });

    ///////////////////////////// DATA RECORDING /////////////////////////////

    document.addEventListener("DOMContentLoaded", function() {
        // Reset all the click counters when the page loads
        localStorage.setItem("clickCounter", "0");
        localStorage.setItem("emergentClicks", "0");
        localStorage.setItem("importantClicks", "0");
        localStorage.setItem("nonUrgentClicks", "0");

        // Track user inactivity
        let inactive = 0;
        let totalInactiveTime = 0;
        const inactivityThreshold = 10000; // (5s for testing, later change to 2 minutes)
        let inactivityTimer = null;
        let inactiveStartTime = null;
        let eachInactiveTime = [];

        // Initialize user inactivity data in local storage
        localStorage.setItem("inactive", inactive);
        localStorage.setItem("totalInactiveTime", totalInactiveTime);
        localStorage.setItem("eachInactiveTime", JSON.stringify(eachInactiveTime));

        function resetActivity() {
            // Clear the previous timer if user moves, clicks, or types
            clearTimeout(inactivityTimer);

            // If the user was inactive, calculate inactivity duration before resetting
            if (inactiveStartTime !== null) {
                let inactiveEndTime = Date.now();
                let inactivityDuration = (inactivityThreshold / 1000) + (Math.floor((inactiveEndTime - inactiveStartTime) / 1000)); // Convert to seconds

                // Store in array and localStorage
                eachInactiveTime.push(inactivityDuration);
                localStorage.setItem("eachInactiveTime", JSON.stringify(eachInactiveTime));
                // console.log(`User was inactive for ${inactivityDuration} seconds`);

                // Sum the total inactivty duration
                totalInactiveTime += inactivityDuration
                localStorage.setItem("totalInactiveTime", totalInactiveTime);
                // console.log(`Users total inactivity time is ${totalInactiveTime} seconds`);

                // Reset inactiveStartTime after tracking
                inactiveStartTime = null;
            }

            // Start a new timer, increment the count and store in localStorage
            inactivityTimer = setTimeout(() => {
                inactive++;
                localStorage.setItem("inactive", inactive);

                inactiveStartTime = Date.now(); // Store new inactivity start time
                // console.log(`User inactive! Count: ${inactive}`);
            }, inactivityThreshold);
        }

        document.addEventListener("mousedown", resetActivity);
        // document.addEventListener("mousemove", resetActivity);
        document.addEventListener("keydown", resetActivity);


        // Reset start time when the page loads and remove the previous one
        localStorage.removeItem("startTime");
        const startTime = Math.floor(Date.now() / 1000);
        localStorage.setItem("startTime", startTime);
        // console.log("Task timer started at: ", startTime);
        // console.log("Click count = 0");

        // Add event listener for the "Submit" button
        const submitBtn = document.getElementById("submit-task-btn");
        if (submitBtn) {
            submitBtn.addEventListener("click", function(event) {
                event.preventDefault() // Prevent immediate page redirection

                // Retrieve stored task start time from above
                const startTime = parseInt(localStorage.getItem("startTime"), 10);
                if (!startTime) {
                    console.error("Start time not found.")
                    return;
                }

                // Capture end time and calculate total duration
                const endTime = Math.floor(Date.now() / 1000);
                const totalTime = endTime - startTime;

                // Retrieve all click counts from above (localStorage) before sending data
                const clickCounter = parseInt(localStorage.getItem("clickCounter"), 10) || 0;
                const emergentClicks = parseInt(localStorage.getItem("emergentClicks"), 10) || 0;
                const importantClicks = parseInt(localStorage.getItem("importantClicks"), 10) || 0;
                const nonUrgentClicks = parseInt(localStorage.getItem("nonUrgentClicks"), 10) || 0;

                // Retrieve user inactivity data from above
                const inactive = parseInt(localStorage.getItem("inactive"), 10) || 0;
                const eachInactiveTime = JSON.parse(localStorage.getItem("eachInactiveTime")) || [];
                // const formattedEachInactiveTime = eachInactiveTime.length > 0 ? eachInactiveTime.join(";") : "None";
                const totalInactiveTime = parseInt(localStorage.getItem("totalInactiveTime"), 10) || 0;
                const inactiveAfterNotification = JSON.parse(localStorage.getItem("inactiveAfterNotification")) || [];

                // console.log("Task completed. Total time: ", totalTime, "seconds");
                // console.log("Total notifications clicked: ", clickCounter);

                // alert(`Start Time: ${startTime} \nEnd Time: ${endTime} \nTime Diff (ms): ${endTime - startTime} \nTime Diff (s): ${totalTime}\nTotal Notification Clicks: ${clickCounter}`);

                // Prepare data to send to server
                const taskData = {
                    time: totalTime,
                    clicks: clickCounter,
                    emergentClicks: emergentClicks,
                    importantClicks: importantClicks,
                    nonUrgentClicks: nonUrgentClicks,
                    inactive: inactive,
                    eachInactiveTime: JSON.stringify(eachInactiveTime),
                    totalInactiveTime: totalInactiveTime,
                    inactiveAfterNotification: JSON.stringify(inactiveAfterNotification)
                };

                // Send task data to server (backend)
                fetch("http://localhost:5000/store-experiment-data", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: `time=${taskData.time}&clicks=${taskData.clicks}&emergentClicks=${taskData.emergentClicks}&importantClicks=${taskData.importantClicks}&nonUrgentClicks=${taskData.nonUrgentClicks}&inactive=${taskData.inactive}&eachInactiveTime=${encodeURIComponent(taskData.eachInactiveTime)}&totalInactiveTime=${taskData.totalInactiveTime}&inactiveAfterNotification=${encodeURIComponent(taskData.inactiveAfterNotification)}`

                    // body: new URLSearchParams(taskData).toString()
                })
                .then(response => response.json())
                .then(data => {
                    console.log("Response: ", data);

                    // Reset all the click counters if the data was sent successfully
                    localStorage.setItem("clickCounter", "0");
                    localStorage.setItem("emergentClicks", "0");
                    localStorage.setItem("importantClicks", "0");
                    localStorage.setItem("nonUrgentClicks", "0");
                    localStorage.setItem("inactive", "0");
                    localStorage.setItem("eachInactiveTime", JSON.stringify([]));
                    localStorage.setItem("totalInactiveTime", "0");
                    localStorage.setItem("inactiveAfterNotification", JSON.stringify([]));

                    // Redirect page after data is sent successfully
                    window.location.href = "../page/test-complete.html";
                })
                .catch(error => {
                    console.error("Error sending data: ", error);
                });
            });
        }
    });

    // Notification Panel
    document.addEventListener("DOMContentLoaded", function () {
        const notificationBtn = document.querySelector(".notification-center-btn");
        const notificationPanel = document.getElementById("notification-panel");
        const closePanelBtn = document.getElementById("close-panel");
    
        // Open panel when button is clicked
        notificationBtn.addEventListener("click", function () {
            notificationPanel.classList.add("active");
        });
    
        // Close panel when '×' button is clicked
        closePanelBtn.addEventListener("click", function () {
            notificationPanel.classList.remove("active");
        });
    
        // Close panel if user clicks outside of it
        // document.addEventListener("click", function (event) {
        //     if (!notificationPanel.contains(event.target) && !notificationBtn.contains(event.target)) {
        //         notificationPanel.classList.remove("active");
        //     }
        // });
    });
    