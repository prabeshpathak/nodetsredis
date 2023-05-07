import net from "net";
import HashTable from "./data";

interface RedisCommand {
  name: string;
  args: string[];
}

const commandList = [
  "SET",
  "GET",
  "DEL",
  "FLUSH",
  "HGET",
  "HSET",
  "HGETALL",
  "GETALL",
  "HELP",
];

var server = net.createServer();
server.on("connection", handleConnection);

server.listen(9000, function () {
  console.log("server listening on ", server.address());
});

function handleConnection(conn: net.Socket) {
  const hashTable = new HashTable();
  let remoteAddress = conn.remoteAddress + ":" + conn.remotePort;
  console.log("new connection from ", remoteAddress);

  conn.setEncoding("utf-8");

  conn.on("data", onConnData);
  conn.once("close", onConnClose);
  conn.on("error", onConnError);

  function onConnClose() {
    console.log("Connection closed from ", remoteAddress);
  }

  function onConnData(d: Buffer) {
    console.log("Connection data from ", remoteAddress, d);

    conn.write(
      "-----------------------------------\r\n" +
        executeCommand(hashTable, parseCommand(d.toString())) +
        "\r\n-----------------------------------\r\nnode-redis>>> "
    );
  }

  function onConnError() {
    console.log("Connection Error from ", remoteAddress);
  }
}

const parseCommand = (input: string): RedisCommand => {
  const tokens = input.trim().split(/\s+/);
  return {
    name: tokens[0],
    args: tokens.slice(1),
  };
};

const executeCommand = (
  hashTable: HashTable,
  command: RedisCommand
): string => {
  const { name, args } = command;
  switch (name) {
    case "SET":
      hashTable.set(args[0], args.slice(1).join(" "));
      return "OK";
    case "GET":
      return hashTable.get(args[0]) ?? "(nil)";
    case "GETALL":
      return JSON.stringify(hashTable.getAll()) ?? "(nil)";
    case "DEL":
      hashTable.del(args[0]);
      return "OK";
    case "FLUSH":
      hashTable.flushall();
    case "HSET":
      hashTable.hset(args[0], args[1], args.slice(1).join(" "));
      return "OK";
    case "HGET":
      return hashTable.hget(args[0], args[1]) ?? "(nil)";
    case "HGETALL":
      return JSON.stringify(hashTable.hgetall(args[0])) ?? "(nil)";
    case "HELP":
      return JSON.stringify(commandList);

    default:
      return `Unknown command: ${command.name}`;
  }
};
