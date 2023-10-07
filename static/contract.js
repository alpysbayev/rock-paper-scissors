const { ethers } = require("ethers")



async function playGame() {
    try {
        const choice = document.getElementById("choice").value;
        const betAmount = document.getElementById("betAmount").value;

        const tx = await gameContract.play(choice, {
            value: ethers.utils.parseEther(betAmount),
            gasLimit: 1000000
        });

        const receipt = await tx.wait();

        console.log(receipt)

        // Parsing logs using the ABI
        const parsedLogs = receipt.logs.map(log => {
            try {
                return gameContract.interface.parseLog(log);
            } catch (error) {
                return null;
            }
        }).filter(parsedLog => parsedLog !== null);

        // Filtering for the GameResult event and displaying the result
        for (let parsedLog of parsedLogs) {
            if (parsedLog.name === "GameResult") {
                document.getElementById("result").innerText = parsedLog.args.result;
            }
        }

    } catch (error) {
        console.error("Error:", error);
        document.getElementById("result").innerText = "An error occurred.";
    }
}