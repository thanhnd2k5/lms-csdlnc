const fs = require("fs");
const path = require("path");

const DEFAULT_STATE = {
  activeWriteHost: process.env.DB_WRITE_HOST || process.env.DB_HOST || "127.0.0.1",
  activeWritePort: Number(process.env.DB_WRITE_PORT || process.env.DB_PORT || 3306),
  lastFailoverAt: null,
};

function getStateFilePath() {
  const configuredPath = process.env.DB_ROLE_STATE_FILE || "./tmp/db-role-state.json";
  return path.resolve(process.cwd(), configuredPath);
}

function ensureStateFile() {
  const stateFile = getStateFilePath();
  const stateDir = path.dirname(stateFile);

  if (!fs.existsSync(stateDir)) {
    fs.mkdirSync(stateDir, { recursive: true });
  }

  if (!fs.existsSync(stateFile)) {
    fs.writeFileSync(stateFile, JSON.stringify(DEFAULT_STATE, null, 2), "utf8");
  }

  return stateFile;
}

function readState() {
  const stateFile = ensureStateFile();

  try {
    const raw = fs.readFileSync(stateFile, "utf8");
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch (error) {
    console.error("Failed to read DB role state:", error.message);
    return { ...DEFAULT_STATE };
  }
}

function writeState(nextState) {
  const stateFile = ensureStateFile();
  const state = {
    ...DEFAULT_STATE,
    ...nextState,
  };

  fs.writeFileSync(stateFile, JSON.stringify(state, null, 2), "utf8");
  return state;
}

module.exports = {
  ensureStateFile,
  readState,
  writeState,
};
