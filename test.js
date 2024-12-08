const webdriver = require('selenium-webdriver');
const assert = require('assert');
const driver = new webdriver.Builder().forBrowser('chrome').build();

async function runTest() {
    try {
        // Open the HTML file in the browser
        await driver.get('file://' + __dirname + '/index.html');

        // Test Addition
        console.log('Testing Addition...');
        const num1 = await driver.findElement(webdriver.By.id('num1'));
        const num2 = await driver.findElement(webdriver.By.id('num2'));
        const result = await driver.findElement(webdriver.By.id('result'));
        const addButton = await driver.findElement(webdriver.By.id('add'));

        // Enter values for addition
        await num1.clear();
        await num1.sendKeys('50');
        await num2.clear();
        await num2.sendKeys('10');
        await addButton.click();

        // Verify addition result
        const addResult = await result.getText();
        assert.strictEqual(addResult, '60', 'Addition calculation is incorrect');
        console.log('Test passed: Addition is correct');

        // Test Subtraction
        console.log('Testing Subtraction...');
        const subtractButton = await driver.findElement(webdriver.By.id('subtract'));

        // Enter values for subtraction
        await num1.clear();
        await num1.sendKeys('50');
        await num2.clear();
        await num2.sendKeys('10');
        await subtractButton.click();

        // Verify subtraction result
        const subtractResult = await result.getText();
        assert.strictEqual(subtractResult, '40', 'Subtraction calculation is incorrect');
        console.log('Test passed: Subtraction is correct');
    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        // Wait for user input to close the browser
        console.log('Press any key to exit...');
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.on('data', async () => {
            await driver.quit();
            process.exit(0);
        });
    }
}

runTest();