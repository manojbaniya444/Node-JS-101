const net = require("node:net");
const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const blockList = new net.BlockList();

try {
  blockList.addAddress("123.123.123.123");
  blockList.addAddress("192.168.1.1");

  const ipStart = "10.0.0.1";
  const ipEnd = "10.0.0.9";
  const type = "ipv4";

  blockList.addRange(ipStart, ipEnd, type);

  blockList.addSubnet('8592:757c:efae:4e45::', 64, 'ipv6');
} catch (error) {
  console.log(error, "Error type ip");
}

function checkIp(ip) {
  return blockList.check(ip);
}

function isValidIp(ip) {
  return net.isIP(ip);
}

rl.write("Enter an IP address to check:");

rl.on("line", (ip) => {
  if (ip === "close") {
    rl.close();
  } else if (isValidIp(ip) === 0) {
    console.log("Invalid IP address");
  } else {
    if (checkIp(ip)) {
      console.log("This IP is blocked");
    } else {
      console.log("This IP is not blocked");
    }
  }
});
