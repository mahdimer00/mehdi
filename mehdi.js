// Utility to generate random delay between min and max milliseconds
const getRandomDelay = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Function to simulate mouse movement to the element
const moveMouseToElement = (element) => {
    console.log("Simulating mouse movement to element...");
    const rect = element.getBoundingClientRect();
    const mouseX = rect.left + getRandomDelay(5, rect.width - 5);
    const mouseY = rect.top + getRandomDelay(5, rect.height - 5);
    console.log(`Mouse moved to: (${mouseX}, ${mouseY})`);
};

// Function to scroll element into view with a slight delay
const scrollToElement = async (element) => {
    console.log("Scrolling to element...");
    element.scrollIntoView({ behavior: "smooth", block: "center" });
    await new Promise(resolve => setTimeout(resolve, getRandomDelay(500, 1000)));
};

// Function to simulate a human-like click
const humanClick = async (selector) => {
    const element = document.querySelector(selector);
    if (element && typeof element.click === "function") {
        await scrollToElement(element); // Scroll element into view
        moveMouseToElement(element); // Simulate mouse movement
        await new Promise(resolve => setTimeout(resolve, getRandomDelay(200, 500))); // Pause before click
        element.click(); // Perform the click
        console.log(`Clicked on element: ${selector}`);
    } else {
        console.error(`Element not clickable or not found: ${selector}`);
    }
};

// Function to simulate human delay
const delay = (min, max) => new Promise(resolve => setTimeout(resolve, getRandomDelay(min, max)));

// Function to perform a task with human-like behavior
const performTask = async (selector, numClicks = 1, minDelay = 15000, maxDelay = 25000) => {
    for (let i = 0; i < numClicks; i++) {
        await humanClick(selector); // Perform a human-like click
        console.log(`Task cycle ${i + 1}/${numClicks} completed for selector: ${selector}`);
        await delay(minDelay, maxDelay); // Wait for a random interval
    }
};

// Main function to execute tasks
const main = async () => {
    console.log("Starting tasks...");

    // Task 1: Click on footer and wait 10 seconds
    await performTask("#root > div > div.App_content__zOVlq > div.Footer_container__AQYrE > div:nth-child(2)", 1, 10000, 10000);

    // Task 2: Click on daily reward button and wait 10 seconds
    await performTask("#root > div > div.App_content__zOVlq > div.TasksPage_container__\\+2LGE > div > div.TasksList_container__qLLZ9 > div.TasksList_daily__sREc1 > div:nth-child(7) > div.TaskListItemButton_container__zGxYx > button > img", 1, 10000, 10000);

    // Task 3: Click on modal to claim reward
    await performTask("body > div.ModalDailyRewards_sheetModal__K7CE4 > div > div.react-modal-sheet-content > div > div > div > div:nth-child(1) > div", 1, 20000, 20000);

    // Task 4: Close the modal
    await performTask("body > div.ModalDailyRewards_sheetModal__K7CE4 > div > div.ModalDailyRewards_modalHead__au8ZA > div.ModalButtonClose_wrapper__zUspe", 1, 500, 1000);

    // Task 5: Click 20 times on the updated specific task
    await performTask("#root > div > div.App_content__zOVlq > div.TasksPage_container__\\+2LGE > div > div.TasksList_container__qLLZ9 > div.TasksList_daily__sREc1 > div:nth-child(5) > div.TaskListItemButton_container__zGxYx > button > img", 20, 15000, 25000);

    // Task 6: Execute cyclic tasks
    const selectors = [
        "#root > div > div.App_content__zOVlq > div.TasksPage_container__\\+2LGE > div > div.TasksList_container__qLLZ9 > div.TasksList_daily__sREc1 > div:nth-child(2) > div.TaskListItemButton_container__zGxYx > button > img",
        "#root > div > div.App_content__zOVlq > div.TasksPage_container__\\+2LGE > div > div.TasksList_container__qLLZ9 > div.TasksList_daily__sREc1 > div:nth-child(3) > div.TaskListItemButton_container__zGxYx > button > img"
    ];

    for (const selector of selectors) {
        await performTask(selector, 50, 20000, 30000);
    }

    console.log("All tasks completed.");
};

// Start the script
main();
