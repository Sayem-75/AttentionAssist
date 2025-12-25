'use strict';

// Load packages
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const PORT = 5000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// File handling: ensure group_two.csv exists with proper headers
const csvFilePath = 'group_two.csv';
if (!fs.existsSync(csvFilePath)) {
    fs.writeFileSync(csvFilePath, 
        'Session ID, Date, Time, Completion Time, Notification Clicks, Emergent Clicks, Important Clicks, Non-Urgent Clicks, Inactive, Each Inactive Time, Total Inactive Time, Inactive After Notification\n');
}

// POST request (endpoint) to store experiment data
app.post('/store-experiment-data', (req, res) => {
    const time = req.body.time;
    const clicks = req.body.clicks;
    const emergentClicks = req.body.emergentClicks;
    const importantClicks = req.body.importantClicks;
    const nonUrgentClicks = req.body.nonUrgentClicks;

    const inactive = req.body.inactive;
    // const eachInactiveTime = req.body.eachInactiveTime ? req.body.eachInactiveTime.split(",").map(Number) : [];
    const eachInactiveTime = req.body.eachInactiveTime ? JSON.parse(req.body.eachInactiveTime) : [];
    const totalInactiveTime = req.body.totalInactiveTime;
    // const inactiveAfterNotification = req.body.inactiveAfterNotification ? req.body.inactiveAfterNotification.split(",").map(Number) : [];
    const inactiveAfterNotification = req.body.inactiveAfterNotification ? JSON.parse(req.body.inactiveAfterNotification) : [];


    // Error handling: ensure time and clicks data is provided
    if (time === undefined || isNaN(time) || 
        clicks === undefined || isNaN(clicks) ||
        emergentClicks === undefined || isNaN(emergentClicks) ||
        importantClicks === undefined || isNaN(importantClicks) ||
        nonUrgentClicks === undefined || isNaN(nonUrgentClicks) || 
        inactive === undefined || isNaN(inactive) || 
        !Array.isArray(eachInactiveTime) || (eachInactiveTime.length > 0 && eachInactiveTime.some(isNaN)) || 
        totalInactiveTime === undefined || isNaN(totalInactiveTime) || 
        !Array.isArray(inactiveAfterNotification) || (inactiveAfterNotification.length > 0 && inactiveAfterNotification.some(isNaN))) {
        return res.status(400).send("Missing or invalid data.");
    }

    // Format session ID and experiment data
    const sessionId = Date.now(); // Generate unique ID
    const dateTime = new Date().toLocaleString(); // Get the date and time

    // Convert arrays into CSV-safe strings (use "None" if empty)
    const formattedEachInactiveTime = eachInactiveTime.length > 0 ? eachInactiveTime.join(";") : "None";
    const formattedInactiveAfterNotification = inactiveAfterNotification.length > 0 ? inactiveAfterNotification.join(";") : "None";

    const experimentData = `${sessionId},${dateTime},${time},${clicks}, ${emergentClicks}, ${importantClicks}, ${nonUrgentClicks}, ${inactive},${formattedEachInactiveTime},${totalInactiveTime},${formattedInactiveAfterNotification}\n`;

    // Also print the data in terminal
    console.log(` Experiment Data:
        ----------------------------------------------------------
        Session ID: ${sessionId}
        Date & Time: ${dateTime}
        Completion Time: ${time} seconds
        Notification Clicks: ${clicks}
        Emergent Clicks: ${emergentClicks}
        Important Clicks: ${importantClicks}
        Non-Urgent Clicks: ${nonUrgentClicks}
        Number of Times Inactive: ${inactive}
        Each Inactivity Duration: [ ${formattedEachInactiveTime} ] seconds
        Total Inactivity Time: ${totalInactiveTime} seconds
        Inactvity Time After Receiving a Notification: [ ${formattedInactiveAfterNotification} ] seconds
        ----------------------------------------------------------`);

    // Add the data to the file
    fs.appendFile(csvFilePath, experimentData, (err) => {
        if (err) {
            return res.status(500).send("Error writing to file.");
        }
        res.json({
            message: "Data stored!",
            sessionId: sessionId,
            dateTime: dateTime,
            completionTime: time,
            notificationClicks: clicks,
            emergentClicks: emergentClicks,
            importantClicks: importantClicks,
            nonUrgentClicks: nonUrgentClicks,
            inactive: inactive,
            eachInactiveTime: formattedEachInactiveTime,
            totalInactiveTime: totalInactiveTime,
            inactiveAfterNotification: formattedInactiveAfterNotification
        });
    });
});

/*Another path for group one*/
const csvFilePathOne = 'group_one.csv';
if (!fs.existsSync(csvFilePathOne)) {
    fs.writeFileSync(csvFilePathOne, 
        'Session ID, Date, Time, Completion Time, Notification Clicks, Emergent Clicks, Important Clicks, Non-Urgent Clicks, Inactive, Each Inactive Time, Total Inactive Time, Inactive After Notification\n');
}

// POST request (endpoint) to store experiment data
app.post('/store-experiment-data-one', (req, res) => {
    const time = req.body.time;
    const clicks = req.body.clicks;
    const emergentClicks = req.body.emergentClicks;
    const importantClicks = req.body.importantClicks;
    const nonUrgentClicks = req.body.nonUrgentClicks;

    const inactive = req.body.inactive;
    // const eachInactiveTime = req.body.eachInactiveTime ? req.body.eachInactiveTime.split(",").map(Number) : [];
    const eachInactiveTime = req.body.eachInactiveTime ? JSON.parse(req.body.eachInactiveTime) : [];
    const totalInactiveTime = req.body.totalInactiveTime;
    // const inactiveAfterNotification = req.body.inactiveAfterNotification ? req.body.inactiveAfterNotification.split(",").map(Number) : [];
    const inactiveAfterNotification = req.body.inactiveAfterNotification ? JSON.parse(req.body.inactiveAfterNotification) : [];


    // Error handling: ensure time and clicks data is provided
    if (time === undefined || isNaN(time) || 
        clicks === undefined || isNaN(clicks) ||
        emergentClicks === undefined || isNaN(emergentClicks) ||
        importantClicks === undefined || isNaN(importantClicks) ||
        nonUrgentClicks === undefined || isNaN(nonUrgentClicks) || 
        inactive === undefined || isNaN(inactive) || 
        !Array.isArray(eachInactiveTime) || (eachInactiveTime.length > 0 && eachInactiveTime.some(isNaN)) || 
        totalInactiveTime === undefined || isNaN(totalInactiveTime) || 
        !Array.isArray(inactiveAfterNotification) || (inactiveAfterNotification.length > 0 && inactiveAfterNotification.some(isNaN))) {
        return res.status(400).send("Missing or invalid data.");
    }

    // Format session ID and experiment data
    const sessionId = Date.now(); // Generate unique ID
    const dateTime = new Date().toLocaleString(); // Get the date and time

    // Convert arrays into CSV-safe strings (use "None" if empty)
    const formattedEachInactiveTime = eachInactiveTime.length > 0 ? eachInactiveTime.join(";") : "None";
    const formattedInactiveAfterNotification = inactiveAfterNotification.length > 0 ? inactiveAfterNotification.join(";") : "None";

    const experimentData = `${sessionId},${dateTime},${time},${clicks}, ${emergentClicks}, ${importantClicks}, ${nonUrgentClicks}, ${inactive},${formattedEachInactiveTime},${totalInactiveTime},${formattedInactiveAfterNotification}\n`;

    // Also print the data in terminal
    console.log(` Experiment Data:
        ----------------------------------------------------------
        Session ID: ${sessionId}
        Date & Time: ${dateTime}
        Completion Time: ${time} seconds
        Notification Clicks: ${clicks}
        Emergent Clicks: ${emergentClicks}
        Important Clicks: ${importantClicks}
        Non-Urgent Clicks: ${nonUrgentClicks}
        Number of Times Inactive: ${inactive}
        Each Inactivity Duration: [ ${formattedEachInactiveTime} ] seconds
        Total Inactivity Time: ${totalInactiveTime} seconds
        Inactvity Time After Receiving a Notification: [ ${formattedInactiveAfterNotification} ] seconds
        ----------------------------------------------------------`);

    // Add the data to the file
    fs.appendFile(csvFilePathOne, experimentData, (err) => {
        if (err) {
            return res.status(500).send("Error writing to file.");
        }
        res.json({
            message: "Data stored!",
            sessionId: sessionId,
            dateTime: dateTime,
            completionTime: time,
            notificationClicks: clicks,
            emergentClicks: emergentClicks,
            importantClicks: importantClicks,
            nonUrgentClicks: nonUrgentClicks,
            inactive: inactive,
            eachInactiveTime: formattedEachInactiveTime,
            totalInactiveTime: totalInactiveTime,
            inactiveAfterNotification: formattedInactiveAfterNotification
        });
    });
});

// Listen on port
app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});








