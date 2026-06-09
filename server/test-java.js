const fs = require("fs");
const { exec } = require("child_process");

const code = `
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello Java CodeQuest");
    }
}
`;

// 1. write file properly
fs.writeFileSync("Main.java", code);

// 2. compile + run
exec("javac Main.java && java Main", (err, stdout, stderr) => {
    if (err) {
        console.log("ERROR:", stderr || err.message);
        return;
    }

    console.log("OUTPUT:", stdout);
});